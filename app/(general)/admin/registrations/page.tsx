'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CarFront, ExternalLink, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader';
import Empty from '@/components/Empty';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import StatusRadio from './components/StatusRadio';

interface Vehicle {
    first_name: string;
    last_name: string;
    aadhar_number: string;
    driving_license_number: string;
    aadhar_url: string;
    driving_license_url: string;
    vehicle_id: string;
    make: string;
    model: string;
    year: number;
    vehicle_type: string;
    engine_number: string;
    chassis_number: string;
    registration_status: string;
    insurance_number: string;
}

function Registrations() {

    const router = useRouter();
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getVehicles = async () => {
            const res = await fetch(`/api/admin/getRegistrations`);
            const { success, data } = await res.json();
            setVehicles(data)
            setLoading(false)
        }

        getVehicles()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">Registrations</h2>
                    <p className="text-muted-foreground">Manage vehicle registrations</p>
                </div>
            </div>
            {
                loading ?
                    <Loader />
                    :
                    vehicles.length == 0 ?
                        <div className="mt-48">
                            <Empty message="No vehicle registrations found" />
                        </div>
                        :
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {vehicles?.map((vehicle: Vehicle) => (
                                <Card key={vehicle.vehicle_id} className={vehicle.registration_status === "Pending" ? "opacity-70" : ""}>
                                    <CardHeader className="flex justify-between w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <CarFront className="h-5 w-5" />
                                                <CardTitle>{vehicle.make} {vehicle.model} {vehicle.year}</CardTitle>
                                            </div>
                                            <CardDescription>
                                                #{vehicle.vehicle_id} - {vehicle.vehicle_type}
                                            </CardDescription>
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                            <Badge variant={(vehicle.registration_status === "Approve" || vehicle.registration_status === "Decline") ? "default" : "secondary"} className={`h-fit 
                                                    ${vehicle.registration_status === "Approve" && 'bg-green-500'}
                                                    ${vehicle.registration_status === "Decline" && 'bg-red-500'}
                                                `}>
                                                {vehicle.registration_status == 'Approve' && 'Approved'}
                                                {vehicle.registration_status == 'Decline' && 'Declined'}
                                                {vehicle.registration_status == 'Pending' && 'Pending'}
                                            </Badge>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-2 w-2" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="p-2 space-y-1">
                                                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <StatusRadio initialData={vehicle} vehicle_id={vehicle.vehicle_id} setLoading={setLoading} router={router}/>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-2">
                                        <p className='text-xs font-medium text-muted-foreground'>VEHICLE DETAILS</p>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Engine number:</div>
                                            <p className="text-sm text-neutral-800">
                                                {vehicle.engine_number}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Chassis number:</div>
                                            <p className="text-sm text-neutral-800">
                                                {vehicle.chassis_number}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Insurance number:</div>
                                            <p className="text-sm text-neutral-800">
                                                {vehicle.insurance_number}
                                            </p>
                                        </div>
                                        <p className='text-xs font-medium text-muted-foreground mt-2'>OWNER DETAILS</p>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Owner name:</div>
                                            <p className="text-sm text-neutral-800">
                                                {vehicle.first_name} {vehicle.last_name}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Aadhar number:</div>
                                            <p className="text-sm text-neutral-800 flex gap-2">
                                                {vehicle?.aadhar_number}
                                                <Link target='_blank' href={vehicle?.aadhar_url || ''}>
                                                    <ExternalLink className='w-4 h-4 hover:text-blue-500' />
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-muted-foreground">Driving License Number:</div>
                                            <p className="text-sm text-neutral-800 flex gap-2">
                                                {vehicle?.driving_license_number}
                                                <Link target='_blank' href={vehicle?.driving_license_url || ''}>
                                                    <ExternalLink className='w-4 h-4 hover:text-blue-500' />
                                                </Link>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
            }
        </div>
    )
}

export default Registrations