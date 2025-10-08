import { useDraggable } from '@dnd-kit/core';
import { Calendar } from 'lucide-react';
import {
  Card as CardComponent,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

function Card({ data }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(data.id),
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <CardComponent
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="group cursor-grab overflow-hidden rounded-md border bg-card shadow-sm transition-all hover:shadow-md active:cursor-grabbing active:shadow-lg"
      style={style}
    >
      {/* Image placeholder - ready for future image implementation */}
      {data.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-1.5 p-2">
        <CardHeader className="p-0">
          <CardTitle className="line-clamp-2 text-xs leading-tight font-semibold">
            {data.title}
          </CardTitle>
        </CardHeader>

        {data.description && (
          <CardContent className="p-0">
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {data.description}
            </p>
          </CardContent>
        )}

        <CardFooter className="flex items-center justify-between border-t p-0 pt-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="text-[10px]">
              {new Date(data.created_at).toLocaleDateString()}
            </span>
          </div>
          {data.assignedUser && (
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                {data.assignedUser.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </CardFooter>
      </div>
    </CardComponent>
  );
}

export default Card;
