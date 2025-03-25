import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = { name, email, password };
      const response = await axios.post(
        "http://localhost:4000/user/register",
        userData
      );
      toast.success("User Register Successfully" || response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message[0] || "Error While registering");
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 w-full md:mx-4 mx-4 md:w-[450px] md:p-10 rounded-md border-slate-600"
      >
        <h2 className="text-3xl text-center">SignUp</h2>
        <p className="text-center text-slate-500 py-2 text-xl">
          Login To access Your Account
        </p>
        <div className="mt-4">
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              placeholder="Enter Name Here"
              className="bg-transparent border text-slate-400 focus:outline-none focus:bottom-0 border-slate-500 w-full px-4 py-2 rounded-full"
            />
          </div>
          <div className="my-4">
            <input
              type="email"
              placeholder="Enter Email Here"
              className="bg-transparent border text-slate-400 focus:outline-none focus:bottom-0 border-slate-500 w-full px-4 py-2 rounded-full"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              placeholder="Enter Password Here"
              className="bg-transparent border text-slate-400 focus:outline-none focus:bottom-0 border-slate-500 w-full px-4 py-2 rounded-full"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="py-2 px-2 text-center w-full rounded-full bg-gradient-to-r from-indigo-500 bg-pink-500">
              Submit
            </button>
          </div>
          <div>
            <p className="text-center py-4 text-slate-500">
              Already Have Account ?{" "}
              <Link to="/login" className="text-slate-300">
                Signin
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
