import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar_website = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <div className="text-white flex justify-between items-center text-xl py-5 px-20 border-b">
      <div>
        <h2 className="text-3xl">Logo.</h2>
      </div>
      <div>
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
    </div>
  );
};

export default Navbar_website;
