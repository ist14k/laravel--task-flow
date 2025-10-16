import { useState } from 'react';

import type { Project, BoardWithCards } from '@/types/project';
import type { Card } from '@/types';
import { DragEndEvent } from '@dnd-kit/core';
import { router } from '@inertiajs/react';

export const useCardDragEnd = (project: Project) => {
  const [localProject, setLocalProject] = useState<Project>(project);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = Number(active.id);
    const newBoardId = Number(over.id);

    // Optimistic update - immediately update UI
    setLocalProject((prevProject) => {
      // First, find the card to move from all boards
      let cardToMove: Card | null = null;

      const updatedBoards = (prevProject.boards || []).map((board) => {
        const boardWithCards = board as BoardWithCards;
        // Find and store the card before filtering
        if (!cardToMove && boardWithCards.cards) {
          const foundCard = boardWithCards.cards.find(
            (card: Card) => card.id === cardId,
          );
          if (foundCard) {
            cardToMove = foundCard;
          }
        }

        // Remove card from all boards
        return {
          ...board,
          cards: (boardWithCards.cards || []).filter((card: Card) => card.id !== cardId),
        };
      });

      // Add card to the new board
      if (cardToMove) {
        return {
          ...prevProject,
          boards: updatedBoards.map((board) => {
            if (board.id === newBoardId) {
              const boardWithCards = board as BoardWithCards;
              return {
                ...board,
                cards: [
                  ...(boardWithCards.cards || []),
                  { ...cardToMove, board_id: newBoardId },
                ],
              };
            }
            return board;
          }),
        };
      }

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

  return { localProject, handleDragEnd };
};
