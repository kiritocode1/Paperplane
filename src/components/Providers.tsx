'use client'


import { FC } from 'react'
import { Toaster } from 'react-hot-toast'; 
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';


interface ProvidersProps {
  children: React.ReactNode, 
  session : Session
}

const Providers: FC<ProvidersProps> = ({children , session}) => {
  return (
		<>
			<SessionProvider session={session}>
				<Toaster position="top-center" reverseOrder={false} />
				{children}
			</SessionProvider>
		</>
	);
}

export default Providers