import BoardsContainer from '@/components/projects/BoardsContainer';
import CreateBoardSheet from '@/components/projects/CreateBoardSheet';
import CreateCardSheet from '@/components/projects/CreateCardSheet';
import { useCardDragEnd } from '@/hooks/use-card-drag-end';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Project } from '@/types/project';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface ProjectShowProps {
  project: Project;
}

function ProjectShow({ project }: ProjectShowProps) {
  const [boardSheetState, setBoardSheetState] = useState(false);
  const [cardSheetState, setCardSheetState] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  // handle drag end for cards and boards. also change board id of card
  const { localProject, handleDragEnd } = useCardDragEnd(project);

  const openCreateCard = (boardId: number) => {
    setSelectedBoardId(boardId);
    setCardSheetState(true);
  };

  return (
    <AppHeaderLayout>
      <Head title={localProject.name} />
      <div className="flex h-full flex-col">
        {/* <ProjectHeader
          name={localProject.name}
          description={localProject.description}
          onAddBoard={() => setBoardSheetState(true)}
        /> */}

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
    </AppHeaderLayout>
  );
}

export default ProjectShow;
