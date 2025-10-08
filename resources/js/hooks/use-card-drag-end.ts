import { useState } from 'react';

import type { Project } from '@/types/project';
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
      const updatedBoards = (prevProject.boards || []).map((board) => {
        // Remove card from old board
        const filteredCards = (board.cards || []).filter(
          (card) => card.id !== cardId,
        );

        // Add card to new board
        if (board.id === newBoardId) {
          const cardToMove = (prevProject.boards || [])
            .flatMap((b) => b.cards || [])
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

  return { localProject, handleDragEnd };
};
