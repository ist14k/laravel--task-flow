import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from '@/components/ui/textarea';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Link, useForm } from '@inertiajs/react';
import { Calendar, FolderKanban, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description?: string;
  team_id: number;
  created_at: string;
  updated_at: string;
}

interface TeamShowProps {
  team: {
    id: number;
    name: string;
    projects: Project[];
  };
}

function TeamShow({ team }: TeamShowProps) {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    is_private: false,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(`/teams/${team.id}/projects`, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const renderedProjects = team.projects.map((project) => (
    <Link
      key={project.id}
      href={`/teams/${project.team_id}/projects/${project.id}`}
    >
      <Card className="group relative h-full w-full cursor-pointer border border-gray-200 bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-purple-500/10">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600/0 to-pink-600/0 transition-colors duration-300 group-hover:from-purple-600/5 group-hover:to-pink-600/5" />
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
              {project.name}
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              →
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative flex-1 pt-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description
              ? project.description
              : 'No description provided.'}
          </p>
        </CardContent>
        <CardFooter className="relative flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span>
            Created {new Date(project.created_at).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  ));

  return (
    <AppHeaderLayout>
      {/* <Head title={`${team.name} - Projects`} /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                  <FolderKanban className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-4xl font-bold text-transparent">
                    {team.name}
                  </h1>
                  <p className="ml-0 text-gray-600 dark:text-gray-400">
                    Manage projects for this team
                  </p>
                </div>
              </div>
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </SheetTrigger>
              <SheetContent className="p-6 sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Create New Project</SheetTitle>
                  <SheetDescription>
                    Create a new project to organize your tasks.
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter project name"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter project description"
                      rows={4}
                      className={errors.description ? 'border-destructive' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={data.is_private}
                      id="terms"
                      onCheckedChange={(checked) =>
                        setData('is_private', Boolean(checked))
                      }
                    />
                    <Label htmlFor="terms">Make this project private</Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    disabled={processing}
                  >
                    {processing ? 'Creating...' : 'Create Project'}
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>

          {/* Projects Grid */}
          {team.projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {renderedProjects}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <Card className="w-full max-w-md border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:border-purple-700 dark:from-slate-800/50 dark:to-slate-900/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <FolderKanban className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    No projects yet
                  </h3>
                  <p className="mb-6 max-w-md text-muted-foreground">
                    Get started by creating your first project in this team
                  </p>
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Project
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

export default TeamShow;
