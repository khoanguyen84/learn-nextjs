import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement } from "react"

export interface LayoutProps {
    children: any
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}