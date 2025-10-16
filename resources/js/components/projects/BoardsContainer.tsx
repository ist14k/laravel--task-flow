import Board from '@/components/partials/board';
import { Button } from '@/components/ui/button';
import { BoardWithCards } from '@/types/project';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

interface BoardsContainerProps {
  boards: BoardWithCards[];
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
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-full items-start gap-4 p-6">
        <DndContext onDragEnd={onDragEnd}>
          {boards.map((board) => (
            <Board key={board.id} board={board} openCreateCard={onCreateCard} />
          ))}
        </DndContext>

        {/* Add Board Button */}
        {boards.length > 0 && (
          <div className="flex w-80 flex-shrink-0">
            <Button
              variant="outline"
              className="h-12 w-full justify-start border-2 border-dashed border-cyan-300 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-100/30 dark:border-cyan-700 dark:from-cyan-900/20 dark:to-blue-900/20 dark:text-gray-300 dark:hover:border-cyan-600"
              onClick={onAddBoard}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Another Board
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {boards.length === 0 && (
        <div className="flex h-full flex-1 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <Plus className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                No boards yet
              </h3>
              <p className="max-w-sm text-sm text-gray-600 dark:text-gray-400">
                Get started by creating your first board to organize your tasks
              </p>
            </div>
            <Button
              onClick={onAddBoard}
              className="border-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create First Board
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
