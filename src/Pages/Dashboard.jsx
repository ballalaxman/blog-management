import DashUsers from "../Components/DashUsers";
import DashPosts from "../Components/DashPosts";
import DashProfile from "../Components/DashProfile";
import DashSidebar from "../Components/DashSidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashComments from "../Components/DashComments";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam) {
      setTab(tabParam);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
    </div>
  );
};

export default Dashboard;
