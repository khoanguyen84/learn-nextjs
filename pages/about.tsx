import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AdminLayout, MainLayout } from "../components/layout";
import Header from "../components/common/header";


export interface AboutPageProps { }

// const Header = dynamic(() => import('../components/common/header'), { ssr: false })

export default function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const page = router.query?.page;

    useEffect(() => {
        if (!page) return;

        (async function () {
            const res = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
            const result = await res.json();
            setPosts(result.data)
        })();

    }, [page])

    const handleNextPageClick = () => {
        router.push({
            pathname: '/about',
            query: {
                page: (Number(router.query?.page) || 1) + 1
            }
        }, undefined, { shallow: true })
    }
    const handlePreviousPageClick = () => {
        router.push({
            pathname: '/about',
            query: {
                page: (Number(router.query?.page) || 1) - 1
            }
        }, undefined, { shallow: true })
    }

    return (
        <>
            <div>About Page</div>
            <Header />
            <ul>
                {
                    posts.map((post: any) => (
                        <li key={post.id}>{post.title}</li>
                    ))
                }
            </ul>
            <button onClick={handlePreviousPageClick}>Previous Page</button>
            <button onClick={handleNextPageClick}>Next Page</button>
        </>
    )
}

AboutPage.Layout = MainLayout

export async function getStaticProps() {
    return {
        props: {}
    }
}