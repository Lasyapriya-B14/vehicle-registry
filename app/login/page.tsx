"use client"

import type React from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"

export default function LoginPage() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold flex justify-center items-center flex-col gap-2">
            <Car className="h-10 w-10" />
            VehicleRegistry
          </CardTitle>
          <CardDescription className="text-center font-bold">Vehicle Registration Management System</CardDescription>
          <CardDescription className="text-center">Register your vehicles efficiently with our streamlined digital platform. Upload documents, track status, and manage your fleet all in one place.</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col">
          <Button onClick={() => {
            signIn("google", { redirectTo: "/" })
          }} className="w-full font-medium">
            <img width="22" height="22" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

