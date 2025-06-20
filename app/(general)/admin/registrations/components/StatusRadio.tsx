import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface StatusProps {
    initialData: {
        registration_status: string
    }
    vehicle_id: string
    setLoading: any
    router: any
}

function StatusRadio({ initialData, vehicle_id, setLoading, router }: StatusProps) {

    const handleChange = async (value: string) => {
        setLoading(true)

        try {
            const res = await fetch("/api/admin/updateRegistrationStatus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({registration_status: value, vehicle_id: vehicle_id}),
            });

            const { success, message } = await res.json();

            if (success) {
                setLoading(false)
                toast.success(message)
                router.refresh()
            }
        }
        catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }
    }

    return (
        <RadioGroup defaultValue={initialData.registration_status} onValueChange={handleChange} className='p-2 flex flex-col gap-4'>
            <div className="flex items-center cursor-pointer space-x-2">
                <RadioGroupItem value="Approve" id="approve" />
                <Label className='cursor-pointer' htmlFor="approve">Approve</Label>
            </div>
            <div className="flex items-center cursor-pointer space-x-2">
                <RadioGroupItem value="Decline" id="decline" />
                <Label className='cursor-pointer' htmlFor="decline">Decline</Label>
            </div>
            <div className="flex items-center cursor-pointer space-x-2">
                <RadioGroupItem value="Pending" id="pending" />
                <Label className='cursor-pointer' htmlFor="pending">Pending</Label>
            </div>
        </RadioGroup>
    )
}

export default StatusRadio