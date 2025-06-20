import Image from 'next/image'
import React from 'react'

function Empty({ message }: { message: string }) {
    return (
        <div className='flex justify-center items-center text-muted-foreground flex-col gap-5'>
            <Image src="/empty.svg" width={200} height={200} alt='No Data' />
            {message}
        </div>
    )
}

export default Empty