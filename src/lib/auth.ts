import { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { db } from './db';
import GoogleProvider from 'next-auth/providers/google';

function getGoogleCredentials () { 
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        throw new Error('Missing Google Client ID or Client Secret');
    }
    return {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
    };
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db), 
    session: {
        strategy:'jwt',
    }, 
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        })
    ], 
    pages: {
        signIn:'/login'
    }, 
    callbacks: {
        async jwt ({token, user}) {
            const dbUser = (await db.get(`user :${token.id}`)) as User | null; 
            if (dbUser) {
                token.id = user!.id;
                return token; 
            }
            return { 
                id: dbUser!.id,
                name: dbUser!.name,
                email: dbUser!.email,
                picture: dbUser!.image,
            }
        }
        , 
        async session ({ session, token }) { 
            if (token) {
                session!.user!.id = token.id, 
                session!.user!.email = token.email, 
                    session!.user!.name = token.name, 
                session!.user!.image = token.picture
            }
            return session;
        }, 
        redirect () { 
            return '/dashboard'
        }
    }

} 


