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
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
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
      <Card className="h-full w-full cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{team.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Created {new Date(team.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  ));

  return (
    <AppSidebarLayout>
      <Head title="Teams" />
      <div className="container mx-auto space-y-8 px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
            <p className="text-muted-foreground">
              Manage and collaborate with your teams
            </p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>
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
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Team'}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Teams Grid */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderedTeams}
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No teams yet</h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                Get started by creating your first team to collaborate with
                others
              </p>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Team
                  </Button>
                </SheetTrigger>
              </Sheet>
            </CardContent>
          </Card>
        )}
      </div>
    </AppSidebarLayout>
  );
}

export default Teams;
