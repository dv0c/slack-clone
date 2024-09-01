
'use client'
import { UserButton } from "@/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
export default function Home() {
  const [open, setOpen  ] = useCreateWorkspaceModal()
  const { data, isLoading } = useGetWorkspaces();

  const workspaceID = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) return ;

    if(workspaceID) {
      console.log("red to workspace", workspaceID)
    } else if (!open){
      setOpen(true)
    }
  },[workspaceID, isLoading, open, setOpen])

  return (
    <div>
      <UserButton />
    </div>
  );
}
