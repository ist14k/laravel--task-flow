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
    <div className="flex-1 overflow-x-auto">
      <div className="flex min-h-4 items-start gap-4 p-6">
        <DndContext onDragEnd={onDragEnd}>
          {boards.map((board) => (
            <Board key={board.id} board={board} openCreateCard={onCreateCard} />
          ))}
        </DndContext>
      </div>

      {/* Empty State */}
      {boards.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-3 text-center">
            <p className="text-muted-foreground">No boards yet</p>
            <Button onClick={onAddBoard}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Board
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
