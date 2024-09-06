/* eslint-disable no-undef */
// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/bloglogo.png";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import OAuth from "../Components/OAuth";
import { apiUrl } from "../apiInstance";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields Required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post(`${apiUrl}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setLoading(false);
      if (res.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen mt-20">
      <div className="flex max-w-4xl m-auto p-3 flex-col md:flex-row md:items-center md:gap-10">
        {/* left */}
        <div className="flex-1">
          <Link href="#">
            <img
              src={Logo}
              className="w-28 aspect-square sm:w-52"
              alt="Flowbite React Logo"
            />
          </Link>
          <p className="mt-5 text-xl pb-8 md:text-2xl">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label value="Your Username" className="text-lg" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <Label value="Your Email" className="text-lg" />
              <TextInput
                type="text"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <Label value="Your Password" className="text-lg" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "SignUp"
              )}
            </Button>
            <OAuth />
          </form>
          <div>
            <span className="text-lg">Have an account?</span>
            <Link to="/signin" className="text-blue-500 text-lg">
              SignIn
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
