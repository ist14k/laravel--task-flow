import type { Card as CardType } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import { Calendar } from 'lucide-react';
import {
  Card as CardComponent,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface CardProps {
  data: CardType;
}

function Card({ data }: CardProps) {
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
      className="group z-50 cursor-grab overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:border-cyan-300 hover:shadow-md active:scale-105 active:cursor-grabbing active:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-600"
      style={style}
    >
      {/* Image placeholder - ready for future image implementation */}
      {data.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      )}

      <div className="space-y-2 p-3">
        <CardHeader className="p-0">
          <CardTitle className="line-clamp-2 text-sm leading-tight font-semibold text-gray-900 dark:text-white">
            {data.title}
          </CardTitle>
        </CardHeader>

        {data.description && (
          <CardContent className="p-0">
            <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              {data.description}
            </p>
          </CardContent>
        )}

        <CardFooter className="flex items-center justify-between border-t border-gray-100 p-0 pt-2 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs">
              {new Date(data.created_at).toLocaleDateString()}
            </span>
          </div>
          {data.assignedUser && (
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-xs font-bold text-white shadow-sm">
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
