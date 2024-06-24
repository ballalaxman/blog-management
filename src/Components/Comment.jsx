// @ts-nocheck
/* eslint-disable react/prop-types */
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePic}
          alt="profilepic"
          className="w-10 h-10 object-cover rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="text-xs font-bold mr-1 truncate">
            {user ? `@${user.username}` : "anonymous"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-600 pb-2">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 border-t dark:border-gray-700 max-w-fit">
          <button
            className={`text-gray-400 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
            type="button"
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.NumberofLikes > 0 &&
              comment.NumberofLikes +
                " " +
                (comment.NumberofLikes === 1 ? "Like" : "Likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
