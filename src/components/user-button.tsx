'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Loader, LogOut } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useCurrentUser } from "@/features/auth/api/use-current-user"

export const UserButton = () => {
    const { data, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if (isLoading) {
        return <Loader className="animate-spin size-4 text-muted-foreground" />
    }

    if (!data) {
        return null
    }

    const { name, image } = data

    const avatarFallback = name!.charAt(0).toUpperCase()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-10 hover:opacity-75 transition">
                    <AvatarImage className="rounded-md" src={image} alt={name} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={signOut} className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}