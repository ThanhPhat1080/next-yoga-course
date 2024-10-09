import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@services/user';
import { z } from 'zod';
import { APP_ROUTERS } from '@/constants/routers';
import { USER_ROLES_ADMIN_DASHBOARD } from '@/constants/userRoles';

const basicAuthCredential = Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
        email: {},
        password: {},
    },
    authorize: async (credentials) => {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const loginData = await login(email, password);

            if (!loginData) return null;

            return {
                ...loginData,
                ...loginData.user,
            };
        }

        return null;
    },
});

export const authOptions = NextAuth({
    pages: {
        signIn: APP_ROUTERS.LOGIN,
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith(APP_ROUTERS.DASHBOARD);

            if (isOnDashboard) {
                if (isLoggedIn && USER_ROLES_ADMIN_DASHBOARD.includes(auth.user?.role || 'User')) {
                    return true;
                }

                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL(APP_ROUTERS.HOME, nextUrl));
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.email = user?.email || '';
                token.role = user?.role || 'User';
                token.name = user?.name || '';
            }

            return token;
        },
        session({ session, token }) {
            session.id = token.id;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.user.email = token?.email || '';
            session.user.name = token?.name || '';
            session.user.role = token.role;

            return session;
        },
    },
    providers: [basicAuthCredential],
    session: {
        strategy: 'jwt',
    },
} satisfies NextAuthConfig);

export const { handlers, signIn, signOut, auth } = authOptions;
