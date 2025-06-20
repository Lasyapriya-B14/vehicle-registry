import React from 'react'
import ProfileEditor from './components/ProfileEditor'
import { auth } from '@/auth'

async function UserProfilePage() {

    const session = await auth();
    const res = await fetch(`http://localhost:8000/get-user/${session?.user.id}`);
    const { success, data } = await res.json();

    return (
        <div className="space-y-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account settings</p>
            </div>
            <ProfileEditor userdata={data} />
        </div>
    )
}

export default UserProfilePage