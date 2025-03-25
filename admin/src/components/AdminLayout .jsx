import React from "react";
import { Link, useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <div className="space-x-4">
        <Link to="/admin" className="hover:text-gray-400">
          Dashboard
        </Link>
        <Link to="/admin/event" className="hover:text-gray-400">
          Events
        </Link>
        <Link to="/admin/slider" className="hover:text-gray-400">
          Slider
        </Link>
        <Link to="/admin/team" className="hover:text-gray-400">
          Team
        </Link>
        <button className="bg-red-500 px-4 py-2 rounded">
          onClick={handleLogout}
        </button>
      </div>
    </nav>
  );
};

export default AdminLayout;
