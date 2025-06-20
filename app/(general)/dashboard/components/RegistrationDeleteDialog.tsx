'use client'

import React, { useState } from 'react'

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

function RegistrationDeleteDialog({ setOpen, vehicle_id }: { setOpen: any, vehicle_id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        setLoading(true)

        try {
            const res = await fetch("/api/deleteReg", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ vehicle_id: vehicle_id }),
            });

            const { success, message } = await res.json();

            if (success) {
                setLoading(false)
                toast.success(message)
                router.refresh()
                setOpen(false)
            }
        }
        catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='mb-2'>Are you absolutely sure?</DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                    This action cannot be undone. This will permanently delete the vehicle registration
                    and remove your this registration from the database.
                    <span className='flex gap-2'>
                        Vehicle ID:
                        <span className='font-bold'>
                            # {vehicle_id}
                        </span>
                    </span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={handleSave} disabled={loading} variant="destructive">
                    <Trash2 />
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </DialogFooter>
        </DialogContent>

    )
}

export default RegistrationDeleteDialog