import type { Board, BoardWithCards } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { MoreVertical, Plus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
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
      className="flex max-h-full w-80 flex-shrink-0 flex-col rounded-2xl border p-4"
    >
      {/* Board Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{board.name}</h3>
          <Badge variant="secondary" className="rounded-full">
            {board.cards.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Cards List */}
      <div className="flex-1 space-y-2 pb-2">
        <div ref={setNodeRef} className="min-h-4 space-y-2">
          {board.cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
      </div>
      {/* Add Card Button */}
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => openCreateCard(board.id)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Card
      </Button>
    </div>
  );
}

export default Board;
