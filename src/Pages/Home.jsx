// @ts-nocheck
import { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../Components/PostCard";
import { apiUrl } from "../apiInstance";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/post/getPosts`);
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Hi, Laxman Here</h1>
        <p className=" text-gray-500 text-xs sm:text-sm md:text-lg">
          I&apos;m Laxman, a Frontend Developer dedicated to crafting clean,
          efficient, and captivating user interfaces with the latest and most
          reliable technologies. With 1.5 years of dedicated experience in
          frontend development, I specialize in JavaScript, React.js, Next.js,
          and TailwindCSS. I am committed to transforming innovative ideas into
          functional and intuitive digital experiences.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline underline-offset-1"
        >
          See all Posts
        </Link>
      </div>

      <div className="max-w-8xl mx-auto my-10 p-3 flex flex-col gap-9 py-7">
        {posts && posts.length > 0 && (
          <div className="">
            <h2 className="font-semibold text-center py-7">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <p className="text-lg text-teal-500 text-center hover:underline mx-auto w-full py-7">
              <Link to="/search">View all Posts</Link>
            </p>
          </div>
        )}
      </div>

      <div className="p-3 lg:p-5 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
