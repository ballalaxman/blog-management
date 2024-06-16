import axios from "axios";
import DOMPurify from "dompurify";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/post/getposts?slug=${postSlug}`);
        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setLoading(false);
          return;
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="w-full h-screen items-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );
  }

  const sanitizedHTML = DOMPurify.sanitize(post && post.content);

  return (
    <main className="p-3 flex flex-col max-w-6xl min-h-screen mx-auto">
      <h1 className="text-3xl text-center max-w-2xl font-serif p-3 lg:text-4xl mx-auto">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post?.category}`}
        className="self-center mt-5"
      >
        <Button pill color={"grey"} size={"xs"}>
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-sm">
        <span>{new Date(post.updatedAt).toDateString()}</span>
        <span className="italic">
          {(post?.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      ></div>
    </main>
  );
};

export default PostPage;
