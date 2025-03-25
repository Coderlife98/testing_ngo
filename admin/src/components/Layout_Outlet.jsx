import React from "react";
import { Outlet } from "react-router-dom";
import Admin_Navbar from "./Navbar";
const Layout_Outlet = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Admin_Navbar />
      <div className="p-4">
        {/* Yahan par dynamic admin pages load honge */}
        <Outlet />
        {/* Yahan par dynamic admin pages load honge */}
      </div>
    </div>
  );
};

export default Layout_Outlet;
