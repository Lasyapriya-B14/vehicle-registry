import React from 'react'
import { ReactNode } from 'react';
import Header from './components/header';

function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <main className='w-full'>
                <div className='w-full'>
                    <Header />
                    <div className='m-10'>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default layout