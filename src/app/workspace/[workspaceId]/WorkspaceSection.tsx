import { Hint } from '@/app/hint'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { FC } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { useToggle } from "react-use"

interface WorkspaceSectionProps {
    label: string
    hint: string
    onNew?: () => void
    children: React.ReactNode
}

const WorkspaceSection: FC<WorkspaceSectionProps> = ({ children, hint, label, onNew }) => {
    const [on, toggle] = useToggle(true)

    return <section className='flex flex-col mt-2 px-2'>
        <div className='flex items-center px-3.5 group'>
            <Button onClick={toggle}
                variant={'transparent'}
                className='p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'
            >
                <FaCaretDown className={cn('size-4 transition-transform -rotate-90', on && "rotate-0")}/>
            </Button>
            <Button variant={'transparent'} size={'sm'} className='group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center'>
                <span className='truncate'>
                    {label}
                </span>
            </Button>
            {onNew && (
                <Hint label={hint} side='top' align='center'>
                    <Button
                        onClick={onNew}
                        variant={'transparent'}
                        size={'iconSm'}
                        className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'
                    >
                        <PlusIcon className='size-5' />
                    </Button>
                </Hint>
            )}
        </div>
        {on && children}
    </section>
}

export default WorkspaceSection