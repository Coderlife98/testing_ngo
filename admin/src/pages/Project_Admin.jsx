import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Project_Admin = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/fetchProject"
      );
      setData(response.data.data);
      // toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteProject = async (items) => {
    const { _id } = items;
    try {
      const response = await axios.post(
        `http://localhost:4000/dynamic/deleteProject/${_id}`
      );
      toast.success(response.data.message);
      fetchProject();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editProject = async (items) => {
    try {
      navigate("/admin/editProject", { state: { items } });
    } catch (error) {
      // toast.error(error.me)
      console.log("error while editing project data");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/addProject",
        { image, description, heading },
        { new: true }
      );
      setDescription("");
      setHeading("");
      setImage("");
      fetchProject();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="text-white px-16 py-20 bg-black ">
      <div className=" flex justify-center mt-4 md:mt-14 items-center">
        <form
          onSubmit={handleSubmit}
          className="border p-5 w-full md:w-[450px]"
        >
          <div>
            <h3 className="text-white text-center text-3xl font-bold">
              Create Project
            </h3>
          </div>
          <div className="my-3">
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Enter images url Here"
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              name="heading"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
              }}
              placeholder="Enter Heading Here"
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              placeholder="Enter description Here"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>

          <div className="my-3">
            <button className="bg-sky-400 py-2 px-2 w-full">Submit</button>
          </div>
        </form>
      </div>
      {/* {display data Here from database} */}
      <div className="py-4 md:py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {data.map((items, index) => (
            <div key={index} className="border p-4">
              <div>
                <img src={items.image} alt="" />
              </div>
              <div>
                <h3 className="text-center text-2xl font-bold py-4">
                  {items.heading}
                </h3>
              </div>
              <div>
                <h3 className="text-center text-2xl">{items.description}</h3>
              </div>
              <div className="my-4 flex justify-between">
                <div>
                  <button
                    onClick={() => {
                      editProject(items);
                    }}
                    className="bg-red-600 py-2 px-8"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteProject(items);
                    }}
                    className="bg-green-600 py-2 px-8"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project_Admin;
