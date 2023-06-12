import React from "react";
import Link from "next/link";
import { LayoutProps } from "../../models";
import { Stack } from "@mui/material";
import { Header, Footer } from "../common";
import {Box} from "@mui/material"

export function MainLayout({ children }: LayoutProps) {
    return (
        <Stack minHeight={'100vh'}>
            <Header />
            <Box component={'main'} flexGrow={1}>
                <Link href={"/"}>Home</Link>
                <Link href={"/blog"}>Blog</Link>
                <Link href={"/works"}>Works</Link>
                {children}
            </Box>
            <Footer />
        </Stack>
    )
}