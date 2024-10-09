import { getUsers } from '@services/user';

const Page = async () => {
    const data = await getUsers();
    return <div>{JSON.stringify(data)}</div>;
};

export default Page;
