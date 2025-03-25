import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux"; // used for update in store
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginFail, loginStart, loginSuccess } from "../../redux/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginStart()); // Start loading
    try {
      const userData = { email, password };
      const response = await axios.post(
        "http://localhost:4000/user/login",
        userData
      );
      if (response.data.success) {
        //Token ko local storge me store kar rha hai
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Login Successfully");
        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );

        navigate("/admin"); //redirect kar rha hu admin dashboard pe
      }
    } catch (error) {
      dispatch(loginFail()); // Stop loading on error
      toast.error(
        Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error.response.data.message
      );
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="border p-4 w-full md:mx-4 mx-4 md:w-[450px] md:p-10 rounded-md border-slate-600"
      >
        <h2 className="text-3xl text-center">Login</h2>
        <p className="text-center text-slate-500 py-2 text-xl">
          Login To access Your Account
        </p>
        <div className="mt-4">
          <div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Here"
              className="bg-transparent border text-slate-400 focus:outline-none focus:bottom-0 border-slate-500 w-full px-4 py-2 rounded-full"
              name="email"
              id="email"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password Here"
              className="bg-transparent border text-slate-400 focus:outline-none focus:bottom-0 border-slate-500 w-full px-4 py-2 rounded-full"
              name="password"
              id="password"
            />
          </div>
          <div>
            <button className="py-2 px-2 text-center w-full rounded-full bg-gradient-to-r from-indigo-500 bg-pink-500">
              Submit
            </button>
          </div>
          <div>
            <p className="text-center py-4 text-slate-500">
              Not Have Account Toll ?{" "}
              <Link to="/register" className="text-slate-300">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
