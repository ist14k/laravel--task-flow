import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectHeaderProps {
  name: string;
  description?: string;
  onAddBoard: () => void;
}

export default function ProjectHeader({
  name,
  description,
  onAddBoard,
}: ProjectHeaderProps) {
  return (
    <div className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button variant="outline" onClick={onAddBoard}>
          <Plus className="mr-2 h-4 w-4" />
          Add Board
        </Button>
      </div>
    </div>
  );
}
