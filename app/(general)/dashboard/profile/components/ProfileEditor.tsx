'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import AadharUploader from './AadharUploader'
import DLUploader from './DLUploader'

const userSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Primary phone is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip_code: z.string().min(1, "Zip code is required"),
    country: z.string().min(1, "Country is required"),
    aadhar_number: z.string().min(1, "Aadhar number is required"),
    driving_license_no: z.string().min(1, "Driving license number is required")
})

type UserData = {
    owner_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    aadhar_number: string;
    driving_license_no: string;
    aadhar_url: string;
    driving_license_url: string;
};

function ProfileEditor({ userdata }: { userdata: UserData }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(userdata)

    const handleChange = (field: string, value: string) => {
        setFormData((prev: UserData) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = async () => {
        const result = userSchema.safeParse(formData)

        if (!result.success) {
            const firstError = result.error.issues[0]
            toast.error(`${firstError.path}: ${firstError.message}`)
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/setUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
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
        <div className="space-y-6">
            <Card className='flex flex-col gap-10'>
                <div className='space-x-4 flex flex-col gap-6'>
                    <CardHeader>
                        <CardTitle>Owner Information</CardTitle>
                        <CardDescription>Update your owner details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue={userdata?.first_name || ""} placeholder='John' onChange={e => handleChange('first_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue={userdata?.last_name || ""} placeholder='Doe' onChange={e => handleChange('last_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input disabled id="email" placeholder='johndoe@example.com' value={userdata?.email || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" defaultValue={userdata?.phone || ""} placeholder='+91 9832324575' onChange={e => handleChange('phone', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" defaultValue={userdata?.city || ""} onChange={e => handleChange('city', e.target.value)} placeholder='Bengaluru' />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" defaultValue={userdata?.state || ""} onChange={e => handleChange('state', e.target.value)} placeholder='Karnataka' />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip-code">Zip Code</Label>
                                <Input id="zip-code" defaultValue={userdata?.zip_code || ""} onChange={e => handleChange('zip_code', e.target.value)} placeholder='560035' />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" defaultValue={userdata?.country || ""} onChange={e => handleChange('country', e.target.value)} placeholder='India' />
                            </div>
                        </div>
                    </CardContent>
                </div>
                <div className='space-x-4 flex flex-col gap-6'>
                    <CardHeader>
                        <CardTitle>Owner Document Information</CardTitle>
                        <CardDescription>Update your document details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="aadhar-number">Aadhar Number</Label>
                                <Input id="aadhar-number" defaultValue={userdata?.aadhar_number || ""} placeholder='1234 5678 9012' onChange={e => handleChange('aadhar_number', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dl">Driving License Number</Label>
                                <Input id="dl" defaultValue={userdata?.driving_license_no || ""} placeholder='TN01 20250012345' onChange={e => handleChange('driving_license_no', e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </div>
            </Card>
            <Card className='flex flex-col w-full'>
                <CardHeader>
                    <CardTitle>Owner Document Data</CardTitle>
                    <CardDescription>Upload your documents</CardDescription>
                </CardHeader>
                <CardContent className='grid w-full grid-cols-2 gap-10 p-5'>
                    <AadharUploader initialData={userdata} owner_id={userdata.owner_id} />
                    <DLUploader initialData={userdata} owner_id={userdata.owner_id}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileEditor