'use client'

import { useGetChannels } from "@/features/channels/api/use-get-channels"
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from "lucide-react"
import SidebarItem from "./SidebarItem"
import UserItem from "./UserItem"
import { WorkspaceHeader } from "./WorkspaceHeader"
import WorkspaceSection from "./WorkspaceSection"
import { useChannelId } from "@/hooks/use-channel-id"

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId()
    const channelId = useChannelId()

    const [_, setOpen] = useCreateChannelModal()



    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
    const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId })
    const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId })

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="animate-spin size-5 text-white" />
            </div>
        )
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">Workspace not found</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full ">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'} />
            <div className="flex flex-col px-2 mt-3">
                <SidebarItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="threads"
                />
                <SidebarItem
                    label="Drafts & Sent"
                    icon={SendHorizonal}
                    id="drafts"
                />
            </div>
            <WorkspaceSection label="Channels" hint="New channel" onNew={member.role ==="admin" ? () => setOpen(true) : undefined}>
                {channels?.map((item) => (
                    <SidebarItem
                        key={item._id}
                        label={item.name}
                        icon={HashIcon}
                        id={item._id}
                        variant={item._id === channelId ? 'active' : 'default'}
                    />
                ))}
            </WorkspaceSection>
            <WorkspaceSection label="Direct Messages" hint="New direct message" onNew={() => { }}>
                {members?.map((item) => (
                    <UserItem
                        id={item._id}
                        key={member._id}
                        image={item.user.image}
                        label={item.user.name}
                    />
                ))}
            </WorkspaceSection>
        </div>
    )
}