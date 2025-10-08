import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface CreateBoardSheetProps {
  projectId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateBoardSheet({
  projectId,
  open,
  onOpenChange,
}: CreateBoardSheetProps) {
  const boardData = useForm({ name: '', description: '' });

  const handleBoardSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    boardData.post(`/projects/${projectId}/boards`, {
      onSuccess: () => {
        boardData.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle>Create New Board</SheetTitle>
          <SheetDescription>Add a new board to this project.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleBoardSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Board Name</Label>
            <Input
              id="name"
              name="name"
              value={boardData.data.name}
              onChange={(e) => boardData.setData('name', e.target.value)}
              placeholder="Enter board name"
              className={boardData.errors.name ? 'border-destructive' : ''}
              required
            />
            {boardData.errors.name && (
              <p className="text-sm text-destructive">
                {boardData.errors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={boardData.data.description}
              onChange={(e) => boardData.setData('description', e.target.value)}
              placeholder="Enter board description"
              rows={4}
              className={
                boardData.errors.description ? 'border-destructive' : ''
              }
            />
            {boardData.errors.description && (
              <p className="text-sm text-destructive">
                {boardData.errors.description}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={boardData.processing}
          >
            {boardData.processing ? 'Creating...' : 'Create Board'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
