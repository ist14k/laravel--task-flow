import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Team {
    id: number;
    owner_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    owner?: User;
    members?: TeamMember[];
    projects?: Project[];
}

export interface TeamMember {
    id: number;
    team_id: number;
    user_id: number;
    role: 'owner' | 'admin' | 'member';
    created_at: string;
    updated_at: string;
    user?: User;
    team?: Team;
}

export interface Project {
    id: number;
    team_id: number;
    name: string;
    description?: string;
    is_private: boolean;
    created_at: string;
    updated_at: string;
    team?: Team;
    boards?: Board[];
}

export interface Board {
    id: number;
    project_id: number;
    name: string;
    description?: string;
    position: number;
    created_at: string;
    updated_at: string;
}

export interface Card {
    id: number;
    board_id: number;
    title: string;
    description?: string;
    position: number;
    assigned_to?: number;
    created_at: string;
    updated_at: string;
    board?: Board;
    assignedUser?: User;
}

export interface BoardWithCards extends Board {
    cards: Card[];
}
