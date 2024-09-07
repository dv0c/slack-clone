import {
    Dialog, DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useCreateChannelModal } from '../store/use-create-channel-modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const CreateChannelModal = () => {
    const [open, setOpen] = useCreateChannelModal()
    const [name, setName] = useState('')

    const handleClose = () => {
        setName('')
        setOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, '-').toLocaleLowerCase()
        setName(value)
    }

    return <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a channel</DialogTitle>
            </DialogHeader>
            <form className='space-y-4'>
                <Input value={name}
                    disabled={false}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder='e.g plan-budget'
                />
                <div className='flex justify-end'>
                    <Button disabled={false}>
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}