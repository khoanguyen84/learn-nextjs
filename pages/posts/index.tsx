import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import Link from 'next/link';
export interface PostListPageProps {
    posts: any[]
}


export default function PostListPage({ posts }: PostListPageProps) {
    console.log(posts);
    
    return (
        <div>
            <h1>Post List Page</h1>
            <ul>
                {
                    posts.map(post => (
                        <li key={post.id}>
                            <Link href={`posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
    const res = await fetch("https://js-post-api.herokuapp.com/api/posts?_page=1");
    let result = await res.json();
    return {
        props: {
            posts: result.data.map((x: any) => ({ "id": x.id, "title": x.title })),
        }
    }
}