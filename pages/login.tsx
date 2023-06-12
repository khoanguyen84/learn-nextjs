import React from "react"
import { authApi } from "../api-client"
import { useAuth } from "../hooks"
import { useRouter } from "next/router"

export default function LoginPageProps(){
    const { profile, error, login, logout } = useAuth({
        revalidateOnMount: false
    })
    const router = useRouter();

    const handleLoginClick = async () => {
        try {
            await login()
            await router.push('/about');
            console.log('redirect to dashboard');        
        } catch (error) {
            console.log('fail to login', error);            
        }
    }
    const handleGetProfileClick = async () => {
        try {
            await authApi.getProfile();
        } catch (error) {
            console.log('fail to get profile', error);
        }
    }
    const handleLogoutClick = async () => {
        try {
            await logout();
            router.push('/login')
            console.log('redirect to login page');
            
        } catch (error) {
            console.log('fail to logout', error);
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
            <div>Profile: { JSON.stringify(profile || {},  null, 4)}</div>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleGetProfileClick}>Profile</button>
            <button onClick={handleLogoutClick}>Logout</button>
            <button onClick={() => router.push('/about')}>Go to About Page</button>
        </div>
    )
}