
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { authApi } from '../api-client';

export function useAuth(options?: Partial<PublicConfiguration>) {
    const { data: profile, mutate, error, isValidating } = useSWR('/profile', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options
    })
    console.log({ profile, error });

    const firstLoading = profile === undefined && error === undefined

    async function login() {
        await authApi.login({
            username: "Khoa nguyễn",
            password: '123123'
        })
        await mutate(); //call api
    }

    async function logout() {
        await authApi.logout();
        await mutate({}, false)
    }
    return {
        profile,
        error,
        firstLoading,
        login,
        logout
    }
}