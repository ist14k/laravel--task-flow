import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart3, CheckCircle, Users, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Welcome back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stat Card 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 transition-colors group-hover:from-blue-600/5 group-hover:to-cyan-600/5" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  +12%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed Tasks
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  24
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 transition-colors group-hover:from-purple-600/5 group-hover:to-pink-600/5" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  +3
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Team Members
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  12
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 to-orange-600/0 transition-colors group-hover:from-yellow-600/5 group-hover:to-orange-600/5" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  Active
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Projects
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  8
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 transition-colors group-hover:from-green-600/5 group-hover:to-emerald-600/5" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  ↑ 28%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Productivity
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  85%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Chart Section */}
        <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
          <div className="absolute inset-0">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-blue-200/40 dark:stroke-slate-700/40" />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Performance Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your progress and achievements
            </p>
          </div>
        </div>
      </div>
    </AppHeaderLayout>
  );
}
