import React from "react";
import Link from "next/link";
import { LayoutProps } from "../../models";
import { Auth } from "../common";

export function AdminLayout({ children }: LayoutProps) {
    return (
        <Auth>
            <h1>Admin Layout</h1>
            <div>SideBar</div>
            <Link href={"/"}>Home</Link> |
            <Link href={"/about"}>About</Link>
            <div>{children}</div>
        </Auth>
    )
}