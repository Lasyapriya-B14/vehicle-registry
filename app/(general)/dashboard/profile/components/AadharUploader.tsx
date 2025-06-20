'use client'

import React from 'react'

interface AadharFormProps {
    initialData: {
        aadhar_url: string | null
    };
    owner_id: string
}

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { File, Image } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
    'https://cxjelmzflqhcspaklgzx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4amVsbXpmbHFoY3NwYWtsZ3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5Mjg0NzMsImV4cCI6MjA2MTUwNDQ3M30.5Jyo_3LYcUQASmhMlZFH9S4CbDFIBQulZkKEhNEhVww'
);

function AadharUploader({ initialData, owner_id }: AadharFormProps) {

    const [aadhar_url, setAadharUrl] = useState<string | null>(initialData.aadhar_url);
    const router = useRouter();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const { error } = await supabase.storage
            .from('documents')
            .upload(`${owner_id}/${file.name}`, file);

        const { data } = supabase.storage
            .from('documents')
            .getPublicUrl(`${owner_id}/${file.name}`);

        setAadharUrl(data.publicUrl);

        try {
            const res = await fetch("/api/setOwnerAadhar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ document_url: data.publicUrl }),
            });

            const { success, message } = await res.json();

            if (success) {
                toast.success(message)
                router.refresh()
            }
        }
        catch (error) {
            toast.error("Something went wrong")
        }

        router.refresh();

    }, [owner_id]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'application/pdf': ['.pdf'],
        }
    });

    return (
        <div className='flex h-full bg-white dark:bg-black dark:border-neutral-300 p-5 flex-col gap-5 rounded-lg border-2 border-neutral-100 '>
            <p className='text-base font-medium'>Aadhar Document Attachment</p>
            {
                !aadhar_url &&
                <div {...getRootProps()} className='rounded-lg' style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', cursor: "pointer" }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file here, or click to select one</p>
                </div>
            }
            {aadhar_url ? (
                <Link href={aadhar_url} target='_blank' className='italic flex gap-2'>
                    <File className='h-5 w-5' />
                    1 file attached
                </Link>
            ) : (
                <div>
                    <p className='text-[#d8d8d8] italic'>No file attached</p>
                </div>
            )}
        </div>
    )
}

export default AadharUploader