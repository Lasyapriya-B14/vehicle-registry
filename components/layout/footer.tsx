import { Car } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background border-t mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center gap-8">
                    <div className="space-y-4 flex flex-col justify-center items-center">
                        <Link href="/" className="flex items-center space-x-2 text-primary">
                            <Car className="h-5 w-5" />
                            <span className="font-bold text-lg">VehicleRegistry</span>
                        </Link>
                        <p className="text-sm text-center text-muted-foreground max-w-xs">
                            Streamlining the vehicle registration process with our modern, efficient platform.
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} VehicleRegistry. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}