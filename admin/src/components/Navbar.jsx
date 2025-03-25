import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../frontend/redux/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="text-white flex justify-between items-center text-xl py-5 px-20 border-b">
      <div>
        <h2 className="text-3xl">Logo.</h2>
      </div>
      <div>
        <ul className="flex space-x-8">
          <Link to="/admin">Home</Link>
          <Link to="/admin/slider">Slider</Link>
          <Link to="/admin/event">Event</Link>
          <Link to="/admin/team">Team</Link>
          <Link to="/admin/gallery">Gallery</Link>
          <Link to="/admin/project">Project</Link>
          <Link to="/admin/footer">Footer</Link>
          <button
            onClick={handleLogout}
            className="bg-sky-500 px-5 py-1 text-xl rounded-full"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
