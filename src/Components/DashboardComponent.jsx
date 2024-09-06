// @ts-nocheck
import { apiUrl } from "apiInstance";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthPost, setLastMonthPost] = useState(0);
  const [lastMonthComment, setLastMonthComment] = useState(0);
  const [lastMonthUser, setLastMonthUser] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${apiUrl}/api/user/getUsers?limit=5`);
      if (res.status === 200) {
        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
        setLastMonthUser(res.data.lastMonthUsers);
      }
    };
    const fetchPosts = async () => {
      const res = await axios.get(`${apiUrl}/api/post/getposts?limit=5`);
      if (res.status === 200) {
        setPosts(res.data.posts);
        setTotalPosts(res.data.totalPost);
        setLastMonthPost(res.data.totalPostInLastMonth);
      }
    };
    const fetchComments = async () => {
      const res = await axios.get(`${apiUrl}/api/comment/getComments?limit=5`);
      if (res.status === 200) {
        setComments(res.data.comments);
        setTotalComments(res.data.totalComments);
        setLastMonthComment(res.data.lastMonthComments);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  console.log(lastMonthUser);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUser}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComment}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col justify-between p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPost}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="p-2">Recent Users</h2>
            <Link to={"/dashboard?tab=users"}>
              <Button outline gradientDuoTone="purpleToPink">
                See All
              </Button>
            </Link>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell align="center">User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id}>
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell align="center">
                      <img
                        src={user.profilePic}
                        alt={user.username}
                        className="w-10 h-10 object-cover rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="p-2">Recent Comments</h2>
            <Link to={"/dashboard?tab=comments"}>
              <Button outline gradientDuoTone="purpleToPink">
                See All
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell align="center">Comment Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id}>
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell align="center">
                      {comment.NumberofLikes}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="p-2">Recent Posts</h2>
            <Link to={"/dashboard?tab=posts"}>
              <Button outline gradientDuoTone="purpleToPink">
                See All
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell align="center">Post Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id}>
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-10 object-cover rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96 line-clamp-2">
                      {post.title}
                    </Table.Cell>
                    <Table.Cell align="center">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
