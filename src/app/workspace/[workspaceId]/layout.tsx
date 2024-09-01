'use client'
import React, { FC } from 'react'
import { Toolbar } from './toolbar'
import { Sidebar } from './sidebar'

interface layoutProps {
    children: React.ReactNode
}

const WorkspaceLayout: FC<layoutProps> = ({ children }) => {
    return <div className='h-full'>
        <Toolbar />
        <div className='flex h-[calc(100vh-40px)]'>
            <Sidebar />
            {children}
        </div>
    </div>
}

export default WorkspaceLayout