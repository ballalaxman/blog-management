/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full sm:w-[430px] border border-teal-400 h-[375px] overflow-hidden rounded-lg hover:border-2 transition-all ">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
        <div className="flex flex-col gap-2 p-3">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="text-md italic capitalize">{post.category}</span>
          <Link
            to={`/post/${post.slug}`}
            className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none !rounded-tr-none m-2"
          >
            Read Article
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
