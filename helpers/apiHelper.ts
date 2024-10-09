import { auth } from '@app/auth';

export const fetchApi = async (urlPath: string, options?: RequestInit) => {
    const API_URL = process.env.API_URL || 'http://localhost:3000/api';

    const apiHeader = new Headers();
    apiHeader.append('Content-Type', 'application/json');
    apiHeader.append('accept', 'application/json');

    for (const [key, value] of Object.entries(options?.headers || {})) {
        if (apiHeader.has(key)) {
            apiHeader.set(key, value);
        } else {
            apiHeader.append(key, value);
        }
    }

    const sessionToken = await auth();

    if (sessionToken?.user) {
        apiHeader.append('Authorization', `Bearer ${sessionToken.user.accessToken}`);
    }

    return fetch(API_URL + urlPath, {
        ...options,
        headers: apiHeader,
    }).then((res) => res.json());
};

export default fetchApi;
