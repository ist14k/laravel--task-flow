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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
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
      <Card className="flex h-full w-full cursor-pointer flex-col justify-between gap-2 border-2 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description
              ? project.description
              : 'No description provided.'}
          </p>
        </CardContent>
        <CardFooter className="flex content-end items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Created {new Date(project.created_at).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  ));

  return (
    <AppSidebarLayout>
      {/* <Head title={`${team.name} - Projects`} /> */}
      <div className="container mx-auto space-y-8 px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {/* <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1> */}
            <p className="text-muted-foreground">
              Manage projects for this team
            </p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create New Project</SheetTitle>
                {/* <SheetDescription>
                  Add a new project to {team.name}.
                </SheetDescription> */}
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6 p-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
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
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
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
                      setData({ ...data, is_private: Boolean(checked) })
                    }
                  />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Project'}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Projects Grid */}
        {team.projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderedProjects}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="space-y-3 text-center">
              <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No projects yet</p>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppSidebarLayout>
  );
}

export default TeamShow;
