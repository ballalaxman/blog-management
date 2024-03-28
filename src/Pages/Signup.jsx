// @ts-nocheck
import { Link } from "react-router-dom";
import Logo from "../assets/bloglogo.png";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex max-w-4xl m-auto p-3 flex-col md:flex-row md:items-center md:gap-10'>
        {/* left */}
        <div className='flex-1'>
          <Link href='#'>
            <img
              src={Logo}
              className='h-60 w-60 sm:h-30'
              alt='Flowbite React Logo'
            />
          </Link>
          <p className='mt-5 text-xl pb-8 md:text-2xl'>
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <Label value='Your Username' className='text-lg' />
              <TextInput
                type='text'
                placeholder='username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <Label value='Your Email' className='text-lg' />
              <TextInput
                type='text'
                placeholder='email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <Label value='Your Password' className='text-lg' />
              <TextInput
                type='password'
                placeholder='password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToBlue'
              type='submit'
              className='w-full'
            >
              Sign Up
            </Button>
          </form>
          <div>
            <span className='text-lg'>Have an account?</span>
            <Link to='/signin' className='text-blue-500 text-lg'>
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
