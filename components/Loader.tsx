import { LoaderCircle } from 'lucide-react'
import React from 'react'

function Loader() {
    return (
        <div className="w-full flex justify-center items-center mt-48">
            <LoaderCircle strokeWidth={2.5} size={80} className="animate-spin" />
        </div>
    )
}

export default Loader