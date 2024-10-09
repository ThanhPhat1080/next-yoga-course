import fetchApi from '@helpers/apiHelper';

export const login = async (email: string, password: string) => {
    const loginData = await fetchApi('/v1/user/login/', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return loginData;
};

export const getUsers = async () => {
    const users = await fetchApi('/v1/user/?limit=10&embed=false');

    return users || [];
};
