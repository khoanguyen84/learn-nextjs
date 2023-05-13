import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface PostDetailPageProps {
    post: any
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
    const route = useRouter();
    return (
        <>
            <Link href={"/posts"}>Back</Link>
            <div>
                <h1>Post Detail Page</h1>
                <p>{post.title}</p>
                <p>{post.author}</p>
                <p>{post.description}</p>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
    const res = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`);
    const result = await res.json();

    return {
        paths: result.data.map((x: any) => ({ params: { postId: x.id } })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
    const postId = context.params?.postId;
    if (!postId) return { notFound: true };

    const res = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const result = await res.json();
    return {
        props: {
            post: result
        }
    }
}