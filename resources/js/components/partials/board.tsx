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
      className="flex w-72 flex-shrink-0 flex-col rounded-lg border bg-muted/30 shadow-sm"
    >
      {/* Board Header */}
      <div className="flex items-center justify-between rounded-t-lg border-b bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="max-w-[180px] truncate text-xs font-semibold">
            {board.name}
          </h3>
          <Badge
            variant="secondary"
            className="h-4 rounded-full px-1.5 text-[10px] font-medium"
          >
            {board.cards.length}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-muted"
            >
              <MoreVertical className="h-3.5 w-3.5" />
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

      {/* Cards List */}
      <div className="flex-1 px-2 py-2">
        <div ref={setNodeRef} className="min-h-[20px] space-y-2">
          {board.cards.length > 0 ? (
            board.cards.map((card) => <Card key={card.id} data={card} />)
          ) : (
            <div className="flex items-center justify-center py-6 text-center">
              <p className="text-xs text-muted-foreground">No cards yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Card Button */}
      <div className="rounded-b-lg border-t bg-background px-2 py-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-full justify-start text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => openCreateCard(board.id)}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Card
        </Button>
      </div>
    </div>
  );
}

export default Board;
