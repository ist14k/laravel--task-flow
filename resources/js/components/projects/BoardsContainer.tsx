import Board from '@/components/partials/board';
import { Button } from '@/components/ui/button';
import { Board as BoardType } from '@/types/project';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

interface BoardsContainerProps {
  boards: BoardType[];
  onDragEnd: (event: DragEndEvent) => void;
  onAddBoard: () => void;
  onCreateCard: (boardId: number) => void;
}

export default function BoardsContainer({
  boards,
  onDragEnd,
  onAddBoard,
  onCreateCard,
}: BoardsContainerProps) {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-background">
      <div className="flex h-full items-start gap-3 p-4">
        <DndContext onDragEnd={onDragEnd}>
          {boards.map((board) => (
            <Board key={board.id} board={board} openCreateCard={onCreateCard} />
          ))}
        </DndContext>

        {/* Add Board Button */}
        {boards.length > 0 && (
          <div className="flex w-72 flex-shrink-0">
            <Button
              variant="outline"
              className="h-10 w-full justify-start border-dashed text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              onClick={onAddBoard}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Another Board
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {boards.length === 0 && (
        <div className="flex h-full flex-1 items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold">No boards yet</h3>
              <p className="max-w-sm text-xs text-muted-foreground">
                Get started by creating your first board to organize your tasks
              </p>
            </div>
            <Button onClick={onAddBoard}>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Create First Board
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
