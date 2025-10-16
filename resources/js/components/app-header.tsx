import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  BookOpen,
  Folder,
  LayoutGrid,
  Menu,
  Search,
  Users,
} from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Teams',
    href: '/teams',
    icon: Users,
  },
];

const rightNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const getInitials = useInitials();
  return (
    <>
      <div className="border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 h-10 w-10 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex h-full w-64 flex-col items-stretch justify-between border-r border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader className="flex justify-start text-left">
                  <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                </SheetHeader>
                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                  <div className="flex h-full flex-col justify-between text-sm">
                    <div className="flex flex-col space-y-4">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center space-x-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        >
                          {item.icon && (
                            <Icon iconNode={item.icon} className="h-5 w-5" />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-4">
                      {rightNavItems.map((item) => (
                        <a
                          key={item.title}
                          href={
                            typeof item.href === 'string'
                              ? item.href
                              : item.href.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        >
                          {item.icon && (
                            <Icon iconNode={item.icon} className="h-5 w-5" />
                          )}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link
            href={dashboard()}
            prefetch
            className="flex items-center space-x-2"
          >
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
            <NavigationMenu className="flex h-full items-stretch">
              <NavigationMenuList className="flex h-full items-stretch space-x-2">
                {mainNavItems.map((item, index) => (
                  <NavigationMenuItem
                    key={index}
                    className="relative flex h-full items-center"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        page.url ===
                          (typeof item.href === 'string'
                            ? item.href
                            : item.href.url) &&
                          'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
                        'h-9 cursor-pointer rounded-lg px-3 text-gray-700 transition-all duration-200 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400',
                      )}
                    >
                      {item.icon && (
                        <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />
                      )}
                      {item.title}
                    </Link>
                    {page.url === item.href && (
                      <div className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="group h-9 w-9 cursor-pointer text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
              >
                <Search className="!size-5 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </Button>
              <div className="hidden lg:flex">
                {rightNavItems.map((item) => (
                  <TooltipProvider key={item.title} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={
                            typeof item.href === 'string'
                              ? item.href
                              : item.href.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent p-0 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                        >
                          <span className="sr-only">{item.title}</span>
                          {item.icon && (
                            <Icon
                              iconNode={item.icon}
                              className="size-5 text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                            />
                          )}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-10 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <Avatar className="size-8 overflow-hidden rounded-full border-2 border-blue-200 dark:border-blue-900">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="flex w-full border-b border-gray-200 bg-gradient-to-r from-white/50 to-blue-50/50 dark:border-slate-800 dark:from-slate-900/50 dark:to-slate-800/50">
          <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-start px-6 text-gray-600 dark:text-gray-400">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
