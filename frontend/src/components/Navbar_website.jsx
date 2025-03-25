import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Navbar_website = () => {
  const navigate = useNavigate();
  const [open, isOpen] = useState(true);
  const navigateLogin = () => {
    navigate("/login");
  };
  const handleMenu = () => {
    isOpen(!open);
  };
  return (
    <>
      <div className="text-white relative backdrop z-10 w-full flex justify-between items-center text-xl py-5 lg:px-14 px-10 xl:px-20 border-b">
        <div>
          <h2 className="text-3xl">Logo.</h2>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex space-x-8">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/event">Event</Link>
            <Link to="/project">Project</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/register">
              <button className="bg-orange-400 px-8 py-1 text-[17px]  rounded-full">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                onClick={navigateLogin}
                className="bg-sky-500 px-8 py-1 text-[17px] rounded-full"
              >
                Login
              </button>
            </Link>
          </ul>
        </div>
        <div className="lg:hidden" onClick={handleMenu}>
          {open ? <CiMenuFries /> : <RxCross1 />}
        </div>
      </div>
      <div
        className={`fixed top-[77px] lg:hidden left-0 h-screen w-3/5 bg-black border-r border-r-white z-10 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full "
        }`}
      >
        <ul className="flex flex-col p-6 space-y-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/event">Event</Link>
          <Link to="/project">Project</Link>
          <Link to="/team">Team</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar_website;
