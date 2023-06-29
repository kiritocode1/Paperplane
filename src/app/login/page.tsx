'use client'

import Button from '@/components/ui/Button';
import { FC ,useState} from 'react'
import { signIn } from 'next-auth/react';
import {toast} from "react-hot-toast"       ; 

interface pageProps {
  
}


const Page: FC<pageProps> = ({ }) => {
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const loginWithGoogle = async () => {
        setIsLoading(true); //? show something happening 
        try {
            await signIn('google')
            console.log('google auth success');
        } catch (error) {
            toast.error('google auth somewhat failed'); //? show error
        } finally {
            setIsLoading(false); //? show something happened
        }
    };
    return <>
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 1g:px-8'>
            <div className='w-full flex flex-col items-center max-w-md space-y-8'>
                <div className='flex flex-col items-center gap-8'>
                    logo
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-800"> sign in with google </h2>
                </div>
                <Button isLoading={IsLoading} type='button' className='max-w-sm mx-auto w-full' onClick={loginWithGoogle}>Sign in </Button>
            </div>
        </div>
    </>
};

export default Page;
