// @ts-nocheck
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import Logo from "../assets/bloglogo.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Navbar.Brand href='#'>
        <img src={Logo} className='mr-3 h-6 sm:h-9' alt='Flowbite React Logo' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Laxman Balla
        </span>
      </Navbar.Brand>
      <form>
        <TextInput
          type='text'
          placeholder='search here..'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline !rounded-none'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='hidden sm:inline w-14 h-10'>
          <FaMoon />
        </Button>
        <Link to='/signin'>
          <Button gradientDuoTone='cyanToBlue' size='md'>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
