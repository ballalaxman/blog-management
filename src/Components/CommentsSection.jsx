/* eslint-disable react/prop-types */
// @ts-nocheck
import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const CommentsSection = ({ postId }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/comment/create", {
        content: comment,
        postId: postId,
        userId: currentUser?._id
      });
      if (res.status === 200) {
        setComment("");
        setComments([res.data, ...comments]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/getPostComments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId, comment]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await axios.put(`/api/comment/likeComment/${commentId}`);
      if (res.status === 200) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  NumberofLikes: res.data.likes.length
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedComment) => {
    setComments(
      comments.map((c) => {
        return c._id === comment._id ? { ...c, content: editedComment } : c;
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePic}
            alt="profilepic"
            className="w-6 object-cover rounded-full aspect-square "
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-teal-500 my-5 flex gap1">
          You must be signed in to comment
          <Link to={"signin"} className="text-cyan-600 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment...."
            rows={5}
            maxLength={"200"}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-5">
            <p className="text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone={"purpleToBlue"} type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-500 my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments?.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentsSection;
