// @ts-nocheck
import { Footer } from "flowbite-react";
import Logo from "../assets/bloglogo.png";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-4 border-t-slate-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='w-full grid justify-between sm:flex md:grid-cols-1'>
          <img
            src={Logo}
            className='mr-3 h-16 my-5 sm:h-28'
            alt='Flowbite React Logo'
          />

          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6'>
            <div className=''>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://laxmanballa.netlify.app/'
                  target='_blank'
                  rel='noopener noreferror'
                >
                  Laxman Projects
                </Footer.Link>
                <Footer.Link
                  href='https://laxmanballa.netlify.app/'
                  target='_blank'
                  rel='noopener noreferror'
                >
                  Laxman Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className=''>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/ballalaxman'
                  target='_blank'
                  rel='noopener noreferror'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className=''>
              <Footer.Title title='Privacy Policy' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/ballalaxman'
                  target='_blank'
                  rel='noopener noreferror'
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='Laxman Balla'
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
