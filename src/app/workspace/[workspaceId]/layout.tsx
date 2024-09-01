'use client'
import React, { FC } from 'react'
import { Toolbar } from './toolbar'
import { Sidebar } from './sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { WorkspaceSidebar } from './WorkspaceSidebar'

interface layoutProps {
    children: React.ReactNode
}

const WorkspaceLayout: FC<layoutProps> = ({ children }) => {
    return <div className='h-full'>
        <Toolbar />
        <div className='flex h-[calc(100vh-40px)]'>
            <Sidebar />
            <ResizablePanelGroup autoSaveId="ca-workspace-layout" direction='horizontal'>
                <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5E2C5F]'>
                    <WorkspaceSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={20}>
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </div>
}

export default WorkspaceLayout