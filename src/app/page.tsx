
'use client'
import { UserButton } from "@/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useCreateWorkspaceModal()
  const { data, isLoading } = useGetWorkspaces();

  const workspaceID = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) return;

    if (workspaceID) {
      router.replace(`/workspace/${workspaceID}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [workspaceID, isLoading, open, setOpen])

  return (
    <div>
      <UserButton />
    </div>
  );
}
