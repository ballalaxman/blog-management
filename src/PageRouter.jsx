import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import Projects from "./Pages/Projects";
import Signin from "./Pages/SignIn";
import Footer from "./Components/FooterComponent";
import PrivateRoute from "./Components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default PageRouter;
