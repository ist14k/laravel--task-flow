import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, Plus, Users } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface TeamProps {
  id: number;
  name: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

interface TeamsProps {
  teams: TeamProps[];
}

function Teams({ teams }: TeamsProps) {
  const [open, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/teams', {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const renderedTeams = teams.map((team) => (
    <Link key={team.id} href={`/teams/${team.id}`}>
      <Card className="group relative h-full w-full cursor-pointer border border-gray-200 bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-blue-500/10">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600/0 to-purple-600/0 transition-colors duration-300 group-hover:from-blue-600/5 group-hover:to-purple-600/5" />
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              {team.name}
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              →
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>
              Created {new Date(team.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  ));

  return (
    <AppHeaderLayout>
      <Head title="Teams" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                  Teams
                </h1>
              </div>
              <p className="ml-0 text-gray-600 dark:text-gray-400">
                Manage and collaborate with your teams
              </p>
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              </SheetTrigger>
              <SheetContent className="p-6 sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Create New Team</SheetTitle>
                  <SheetDescription>
                    Create a new team to collaborate with others.
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter team name"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    disabled={processing}
                  >
                    {processing ? 'Creating...' : 'Create Team'}
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>

          {/* Teams Grid */}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {renderedTeams}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <Card className="w-full max-w-md border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:border-blue-700 dark:from-slate-800/50 dark:to-slate-900/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    No teams yet
                  </h3>
                  <p className="mb-6 max-w-md text-muted-foreground">
                    Get started by creating your first team to collaborate with
                    others
                  </p>
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Team
                      </Button>
                    </SheetTrigger>
                  </Sheet>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppHeaderLayout>
  );
}

export default Teams;
