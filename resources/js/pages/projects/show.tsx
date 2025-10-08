import BoardsContainer from '@/components/projects/BoardsContainer';
import CreateBoardSheet from '@/components/projects/CreateBoardSheet';
import CreateCardSheet from '@/components/projects/CreateCardSheet';
import ProjectHeader from '@/components/projects/ProjectHeader';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Project } from '@/types/project';
import { type DragEndEvent } from '@dnd-kit/core';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface ProjectShowProps {
  project: Project;
}

function ProjectShow({ project }: ProjectShowProps) {
  const [boardSheetState, setBoardSheetState] = useState(false);
  const [cardSheetState, setCardSheetState] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  // Local state for optimistic updates
  const [localProject, setLocalProject] = useState(project);

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

  const openCreateCard = (boardId: number) => {
    setSelectedBoardId(boardId);
    setCardSheetState(true);
  };

  return (
    <AppSidebarLayout>
      <Head title={localProject.name} />
      <div className="flex h-full flex-col">
        <ProjectHeader
          name={localProject.name}
          description={localProject.description}
          onAddBoard={() => setBoardSheetState(true)}
        />

        <BoardsContainer
          boards={localProject.boards || []}
          onDragEnd={handleDragEnd}
          onAddBoard={() => setBoardSheetState(true)}
          onCreateCard={openCreateCard}
        />
      </div>

      <CreateBoardSheet
        projectId={project.id}
        open={boardSheetState}
        onOpenChange={setBoardSheetState}
      />

      <CreateCardSheet
        boardId={selectedBoardId}
        open={cardSheetState}
        onOpenChange={setCardSheetState}
      />
    </AppSidebarLayout>
  );
}

export default ProjectShow;
