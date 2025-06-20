'use client'

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Empty from '@/components/Empty';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Owner {
  owner_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  aadhar_number: string;
  driving_license_no: string;
  vehicle_count: string;
  aadhar_url: string;
  driving_license_url: string;
}

function AdminDashboard() {

  const [owners, setOwners] = useState<Owner[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const getowners = async () => {
      const res = await fetch(`/api/admin/getOwners`);
      const { success, data } = await res.json();
      setOwners(data)
      setLoading(false)
    }

    getowners()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Owners</h2>
          <p className="text-muted-foreground">Manage vehicle owners</p>
        </div>
      </div>
      {
        loading ?
          <Loader />
          :
          owners.length == 0 ?
            <div className="mt-48">
              <Empty message="No owners found" />
            </div>
            :
            <div className="grid gap-6 grid-cols-4">
              {owners?.map((owner: Owner) => (
                <Card key={owner.owner_id}>
                  <CardContent className='flex flex-col gap-5'>
                    <div className='w-full flex justify-between items-center'>
                      <div className='text-sm text-neutral-800 flex flex-col gap-1'>
                        <p className='text-xs font-medium text-muted-foreground'>{owner.owner_id}</p>
                        {owner.first_name} {owner.last_name}
                      </div>
                      <div className='flex gap-10'>
                        <div className='text-sm text-neutral-800 flex flex-col gap-1'>
                          <p className='text-xs font-medium text-muted-foreground'># Vehicles</p>
                          {
                            owner.vehicle_count
                          }
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs font-medium text-muted-foreground'>OWNER DETAILS</p>
                        <div className="flex gap-2">
                          <div className="text-sm text-muted-foreground">Email:</div>
                          <p className="text-sm text-neutral-800">
                            {owner?.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-sm text-muted-foreground">Phone:</div>
                          <p className="text-sm text-neutral-800">
                            {owner?.phone}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-sm text-muted-foreground">Aadhar Number:</div>
                          <p className="text-sm text-neutral-800 flex gap-2">
                            {owner?.aadhar_number}
                            <Link target='_blank' href={owner?.aadhar_url || ''}>
                              <ExternalLink className='w-4 h-4 hover:text-blue-500' />
                            </Link>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-sm text-muted-foreground">DL number:</div>
                          <p className="text-sm text-neutral-800 flex gap-2">
                            {owner?.driving_license_no}
                            <Link target='_blank' href={owner?.driving_license_url || ''}>
                              <ExternalLink className='w-4 h-4 hover:text-blue-500' />
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
              }
            </div >
      }
    </div >
  )
}

export default AdminDashboard