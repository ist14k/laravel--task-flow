import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
  variant?: 'header' | 'sidebar';
}

export function AppContent({
  variant = 'header',
  children,
  ...props
}: AppContentProps) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>;
  }

  return (
    <main
      className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      {...props}
    >
      {children}
    </main>
  );
}
