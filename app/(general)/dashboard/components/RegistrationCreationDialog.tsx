'use client'

import React, { useState } from 'react'

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Vehicle {
    vehicle_id: string;
    make: string;
    model: string;
    year: number;
    vehicle_type: string;
    engine_number: string;
    chassis_number: string;
    registration_status: string;
    insurance_doc_content: string;
}

const vehicleSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.preprocess((val) => Number(val), z.number().gt(1900), { message: "Year is required" }),
    vehicle_type: z.string().min(1, "Vehicle type is required"),
    engine_number: z.string().min(1, "Engine number is required"),
    chassis_number: z.string().min(1, "Chassis number is required"),
    insurance_number: z.string().optional(),
})

function RegistrationCreationDialog({ setOpen }: { setOpen: any }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: 0,
        vehicle_type: '',
        engine_number: '',
        chassis_number: "",
        insurance_number: ""
    })

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleSave = async () => {

        setFormData({
            ...formData,
            "year": Number(formData.year)
        })

        const result = vehicleSchema.safeParse(formData)

        if (!result.success) {
            const firstError = result.error.issues[0]
            toast.error(`${firstError.path}: ${firstError.message}`)
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/createReg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const { success, message } = await res.json();

            if (success) {
                setLoading(false)
                toast.success(message)
                router.refresh()
                setFormData({
                    make: "",
                    model: "",
                    year: 0,
                    vehicle_type: '',
                    engine_number: '',
                    chassis_number: "",
                    insurance_number: ""
                })
                setOpen(false)
            }
        }
        catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }
    }

    return (
        <DialogContent className='p-8'>
            <DialogHeader>
                <DialogTitle className='font-medium text-xl'>Create a Registration</DialogTitle>
            </DialogHeader>
            <div className='w-full grid grid-cols-4 gap-5 mt-5'>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="mmake" className='text-sm'>Vehicle Make</Label>
                    <Input id="mmake" placeholder='e.g. Honda' onChange={e => handleChange('make', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="model" className='text-sm'>Vehicle Model</Label>
                    <Input id="model" placeholder='e.g. Civic' onChange={e => handleChange('model', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="year" className='text-sm'>Vehicle Year</Label>
                    <Input type='number' id="year" placeholder='e.g. 2019' onChange={e => handleChange('year', Number(e.target.value))} />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="vehicle-type" className='text-sm'>Vehicle Type</Label>
                    <Input id="vehicle-type" placeholder='e.g. Car' onChange={e => handleChange('vehicle_type', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-4">
                    <Label htmlFor="vehicle-engine" className='text-sm'>Engine Number</Label>
                    <Input id="vehicle-engine" placeholder='e.g. PJ12345U123456P' onChange={e => handleChange('engine_number', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-4">
                    <Label htmlFor="vehicle-chassis" className='text-sm'>Chassis Number</Label>
                    <Input id="vehicle-chassis" placeholder='e.g. SV30-0169266' onChange={e => handleChange('chassis_number', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-4">
                    <Label htmlFor="vehicle-insurance" className='text-sm'>Insurance Number</Label>
                    <Input id="vehicle-insurance" placeholder='12345678LMNOP9' onChange={e => handleChange('insurance_number', e.target.value)} />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default RegistrationCreationDialog