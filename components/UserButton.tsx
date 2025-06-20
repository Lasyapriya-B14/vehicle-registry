'use client'

import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'
import Link from 'next/link'


function UserButton() {

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const { status, data: session } = useSession();

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false);
        }
    }, [status]);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-gray-500" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <Link
                href="/login"
            >
                <Button size="default" className="py-2">
                    Sign in
                </Button>
            </Link>
        );
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className='cursor-pointer'>
                <Image src={session?.user?.image || ""} width={28} height={28} alt='Profile Image' className='rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-4'>
                <DropdownMenuLabel>
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                        <Image
                            src={session?.user?.image!}
                            width={40}
                            height={40}
                            className="cursor-pointer rounded-full max-md:w-10"
                            alt={session?.user?.name ?? ""}
                        />
                        <div className='flex flex-col'>
                            <p className="text-base font-normal">{session?.user?.name}</p>
                            <p className="text-xs font-light">{session?.user?.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => { signOut() }} className="w-full cursor-pointer p-2">
                    <LogOut className="w-5" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserButton