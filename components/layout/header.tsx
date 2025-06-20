"use client";

import Link from "next/link";
import { Car } from "lucide-react";
import UserButton from "../UserButton";

export function Header() {

    return (
        <header className="bg-background border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-primary"
                        >
                            <Car className="h-6 w-6" />
                            <span className="font-bold text-xl">VehicleRegistry</span>
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
    );
}