/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface UserSession {
    accessToken: string;
    refreshToken: string;
    role?: string;
}

declare module 'next-auth' {
    interface Session extends UserSession {
        id: string;
    }

    interface User extends UserSession {
        _id: string; // Mongodb Id object
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends UserSession {
        id: string;
    }
}
