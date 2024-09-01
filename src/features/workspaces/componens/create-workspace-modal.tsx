'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () => {
    const router = useRouter()
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        try {

            const data = await mutate({
                name: "Workspace 1",
            }, {
                onSuccess(data) {
                    router.push(`/workspaces/${data}`)
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog onOpenChange={handleClose} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input disabled={false} value={""} required autoFocus minLength={3} placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'" />
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}