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
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface CreateCardSheetProps {
  boardId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateCardSheet({
  boardId,
  open,
  onOpenChange,
}: CreateCardSheetProps) {
  const cardData = useForm({
    title: '',
    description: '',
    board_id: boardId,
  });

  const handleCardSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    cardData.post(`/cards/new`, {
      onSuccess: () => {
        cardData.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Card</SheetTitle>
          <SheetDescription>Add a new card to this board.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleCardSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Card Title</Label>
            <Input
              id="title"
              value={cardData.data.title}
              onChange={(e) => cardData.setData('title', e.target.value)}
              placeholder="Enter card title"
              className={cardData.errors.title ? 'border-destructive' : ''}
            />
            {cardData.errors.title && (
              <p className="text-sm text-destructive">
                {cardData.errors.title}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={cardData.data.description}
              onChange={(e) => cardData.setData('description', e.target.value)}
              placeholder="Enter card description"
              className={
                cardData.errors.description ? 'border-destructive' : ''
              }
            />
            {cardData.errors.description && (
              <p className="text-sm text-destructive">
                {cardData.errors.description}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={cardData.processing}
          >
            {cardData.processing ? 'Creating...' : 'Create Card'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
