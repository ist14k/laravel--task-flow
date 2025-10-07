import { useDraggable } from '@dnd-kit/core';
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
      className="cursor-pointer transition-colors hover:bg-accent"
      style={style}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
      </CardHeader>
      {data.description && (
        <CardContent className="pt-0">
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {data.description}
          </p>
        </CardContent>
      )}
      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Started at {new Date(data.created_at).toLocaleDateString()}
        </span>
      </CardFooter>
    </CardComponent>
  );
}

export default Card;
