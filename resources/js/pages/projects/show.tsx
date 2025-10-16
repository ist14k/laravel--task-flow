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
      <div className="flex h-full flex-col bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Project Header with Modern Styling */}
        <div className="border-b border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                {localProject.name}
              </h1>
              {localProject.description && (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {localProject.description}
                </p>
              )}
            </div>
            <button
              onClick={() => setBoardSheetState(true)}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg"
            >
              <span className="mr-2 text-lg">+</span>
              Add Board
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <BoardsContainer
            boards={localProject.boards || []}
            onDragEnd={handleDragEnd}
            onAddBoard={() => setBoardSheetState(true)}
            onCreateCard={openCreateCard}
          />
        </div>
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
