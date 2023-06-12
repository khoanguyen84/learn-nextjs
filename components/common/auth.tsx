import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks";
import { useRouter } from "next/router";

export interface AuthProps {
    children: any
}
export function Auth({ children }: AuthProps) {
    const { profile, firstLoading } = useAuth()
    const router = useRouter();
    
    useEffect(() => {
        if (!firstLoading && !profile?.name) {
            router.push('/login')
        }
    }, [router, profile, firstLoading])

    if (!profile?.name) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {children}
        </div>
    )
}