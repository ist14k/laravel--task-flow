import type { Board, BoardWithCards } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { MoreVertical, Plus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Card from './card';

interface BoardProps {
  board: BoardWithCards;
  openCreateCard: (boardId: number) => void;
}

function Board({ board, openCreateCard }: BoardProps) {
  const { setNodeRef } = useDroppable({
    id: String(board.id),
  });

  return (
    <div
      key={board.id}
      className="group flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Board Header with Gradient */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-3 dark:border-slate-700 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-purple-900/30">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600"></div>
          <h3 className="max-w-[200px] truncate text-sm font-bold text-gray-900 dark:text-white">
            {board.name}
          </h3>
          <Badge
            variant="secondary"
            className="h-6 rounded-full border-0 bg-gradient-to-r from-cyan-100 to-blue-100 px-2 text-xs font-semibold text-cyan-700 dark:from-cyan-900/50 dark:to-blue-900/50 dark:text-cyan-300"
          >
            {board.cards.length}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 transition-colors hover:bg-cyan-100 dark:hover:bg-slate-700"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Board</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards List with Custom Scrolling */}
      <div className="min-h-[200px] flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-white/50 to-cyan-50/30 px-3 py-3 dark:from-slate-800/50 dark:to-slate-900/30">
        <div ref={setNodeRef} className="min-h-[20px] space-y-3">
          {board.cards.length > 0 ? (
            board.cards.map((card) => <Card key={card.id} data={card} />)
          ) : (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                No cards yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Card Button */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 px-3 py-2 dark:border-slate-700 dark:from-slate-800/50 dark:to-slate-900/50">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-full justify-start text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-100/50 dark:text-cyan-300 dark:hover:bg-slate-700"
          onClick={() => openCreateCard(board.id)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </div>
    </div>
  );
}

export default Board;
