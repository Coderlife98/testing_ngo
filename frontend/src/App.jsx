import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn ";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file for default styling
import { loginSuccess, selectLoading } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Preloader } from "./components/Preloader";
import { useSelector } from "react-redux";
import Navbar_website from "./components/Navbar_website";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Project from "./pages/Project";
import Event from "./pages/Event";
import Event_Admin from "../../admin/src/pages/Event_Admin";
import AdminDashboard from "../../admin/src/pages/AdminDashboard ";
import ProtectedRoute from "./components/ProtectedRoute";
import Gallery from "../../admin/src/pages/Gallery";
import Edit_Gallery from "../../admin/src/pages/Edit_Gallery";
import Navbar from "../../admin/src/components/Navbar";
import Slider from "../../admin/src/pages/Slider";
import Edit_Event from "../../admin/src/pages/Edit_Event";
import Edit_Team from "../../admin/src/pages/Edit_Team";
import Edit_Project from "../../admin/src/pages/Edit_Project";
import Edit_Slider from "../../admin/src/pages/Edit_Slider";
import Team_Admin from "../../admin/src/pages/Team_Admin"
import Project_Admin from "../../admin/src/pages/Project_Admin"
const App = () => {
  const loading = useSelector(selectLoading); // Check loading state
  const dispatch = useDispatch();
  const [navToken, setNavToken] = useState(localStorage.getItem("token")); // Initialize directly

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(loginSuccess({ user, token }));
      setNavToken(token); // Update state
    } else {
      setNavToken(null); // Ensure state updates on logout
    }
  }, [dispatch]); // Only run when dispatch changes
  return (
    <div className="bg-black text-white min-h-screen w-full">
      {loading && <Preloader />} {/* 🔹 Show preloader when loading */}
      {navToken ? <Navbar /> : <Navbar_website />}
      {console.log("stt", navToken)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/project" element={<Project />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/editGallery"
          element={
            <ProtectedRoute>
              <Edit_Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/slider"
          element={
            <ProtectedRoute>
              <Slider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/event"
          element={
            <ProtectedRoute>
              <Event_Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/editEvent"
          element={
            <ProtectedRoute>
              <Edit_Event />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team"
          element={
            <ProtectedRoute>
              <Team_Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editTeam"
          element={
            <ProtectedRoute>
              <Edit_Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editGallery"
          element={
            <ProtectedRoute>
              <Edit_Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/project"
          element={
            <ProtectedRoute>
              <Project_Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editProject"
          element={
            <ProtectedRoute>
              <Edit_Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit"
          element={
            <ProtectedRoute>
              <Edit_Slider />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
