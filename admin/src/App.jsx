import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file for default styling

import Layout_Outlet from "./components/Layout_Outlet";
const App = () => {
  return (
    <div className="bg-black h-screen w-full text-white">
      <Routes>
        {/* Wrap all admin routes with AdminLayout */}
        {/* <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Layout_Outlet />
            </ProtectedRoute>
          }
        /> */}
       
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
