import UserButton from '@/components/UserButton'
import { Car, CarFront, Layout, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className="bg-background border-b sticky top-0 z-50">
            <div className="px-10">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center border-r-2 pr-5 border-r-border">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-primary"
                        >
                            <Car className="h-6 w-6" />
                            <span className="font-bold text-xl">VehicleRegistry</span>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center gap-10'>
                        <Link
                            href="/admin"
                            className="flex items-center space-x-2 text-primary"
                        >
                            <Users className="h-4 w-4" />
                            <span className="text-sm">Manage Customers</span>
                        </Link>
                        <Link
                            href="/admin/registrations"
                            className="flex items-center space-x-2 text-primary"
                        >
                            <CarFront className="h-4 w-4" />
                            <span className="text-sm">Manage Registrations</span>
                        </Link>
                        <Link
                            href="/admin/profile"
                            className="flex items-center space-x-2 text-primary"
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Settings</span>
                        </Link>
                    </div>
                    <div>
                        <div className="ml-auto flex items-center space-x-4">
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header