/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import axios from "axios";
import PostCard from "../Components/PostCard";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../apiInstance";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized"
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    const sort = urlParams.get("sort");
    const category = urlParams.get("category");

    if (searchTerm) {
      setSideBarData({ ...sidebarData, searchTerm, sort, category });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(
          `${apiUrl}/api/post/getPosts?${searchQuery}`
        );
        if (res.status === 200) {
          setPosts(res.data.posts);
          setShowMore(res.data.posts.length >= 9);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const sort = e.target.value || "desc";
      setSideBarData({ ...sidebarData, sort: sort });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await axios.get(`${apiUrl}/api/post/getposts?${searchQuery}`);
      if (res.status === 200) {
        setPosts([...posts, ...res.data.posts]);
        setShowMore(res.data.posts.length >= 9);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search.."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
              className="w-full"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
              className="w-full"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React JS</option>
              <option value="nextjs">Next Js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button
            type="submit"
            outline
            gradientDuoTone="purpleToPink"
            className="focus:ring-0"
          >
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500 ">No Post Found!</p>
          )}
          {loading && <p className="text-xl text-gray-500 ">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post?._id} post={post} />)}
          {showMore && (
            <button
              className="text-teal-500 text-lg hover:underline p-7 w-full"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
