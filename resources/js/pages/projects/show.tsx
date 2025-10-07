import Board from '@/components/partials/board';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Card {
  id: number;
  title: string;
  description?: string;
  board_id: number;
  created_at: string;
}

interface Board {
  id: number;
  name: string;
  project_id: number;
  cards: Card[];
}

interface Project {
  id: number;
  name: string;
  description?: string;
  boards: Board[];
}

interface ProjectShowProps {
  project: Project;
}

function ProjectShow({ project }: ProjectShowProps) {
  const [open, setOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [errors] = useState<{ title?: string; description?: string }>({});
  const [processing, setProcessing] = useState(false);

  // Local state for optimistic updates
  const [localProject, setLocalProject] = useState(project);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Creating card:', formData, 'for board:', selectedBoardId);
      setFormData({ title: '', description: '' });
      setProcessing(false);
      setOpen(false);
    }, 1000);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = Number(active.id);
    const newBoardId = Number(over.id);

    // Optimistic update - immediately update UI
    setLocalProject((prevProject) => {
      const updatedBoards = prevProject.boards.map((board) => {
        // Remove card from old board
        const filteredCards = board.cards.filter((card) => card.id !== cardId);

        // Add card to new board
        if (board.id === newBoardId) {
          const cardToMove = prevProject.boards
            .flatMap((b) => b.cards)
            .find((card) => card.id === cardId);

          if (cardToMove) {
            return {
              ...board,
              cards: [
                ...filteredCards,
                { ...cardToMove, board_id: newBoardId },
              ],
            };
          }
        }

        return { ...board, cards: filteredCards };
      });

      return { ...prevProject, boards: updatedBoards };
    });

    // Make API call in background
    router.post(
      '/cards/move',
      {
        card_id: cardId,
        new_board_id: newBoardId,
      },
      {
        preserveState: true,
        preserveScroll: true,
        onError: () => {
          // Revert to original state on error
          setLocalProject(project);
        },
      },
    );
  };

  const openCreateCard = (boardId: number) => {
    setSelectedBoardId(boardId);
    setOpen(true);
  };

  return (
    <AppSidebarLayout>
      <Head title={localProject.name} />
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {localProject.name}
              </h1>
              {localProject.description && (
                <p className="text-sm text-muted-foreground">
                  {localProject.description}
                </p>
              )}
            </div>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Board
            </Button>
          </div>
        </div>

        {/* Boards Container */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-h-4 items-start gap-4 p-6">
            <DndContext onDragEnd={handleDragEnd}>
              {localProject.boards.map((board) => (
                <Board
                  key={board.id}
                  board={board}
                  openCreateCard={openCreateCard}
                />
              ))}
            </DndContext>
          </div>
          {/* Empty State */}
          {localProject.boards.length === 0 && (
            <div className="flex flex-1 items-center justify-center">
              <div className="space-y-3 text-center">
                <p className="text-muted-foreground">No boards yet</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Board
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Card Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Card</SheetTitle>
            <SheetDescription>Add a new card to this board.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Card Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter card title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter card description"
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? 'Creating...' : 'Create Card'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </AppSidebarLayout>
  );
}

export default ProjectShow;
