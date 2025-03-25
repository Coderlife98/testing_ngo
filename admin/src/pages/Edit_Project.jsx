import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit_Project = () => {
  const location = useLocation();
  const { items } = location.state;
  const navigate = useNavigate();
  const [description, setDescription] = useState(items.description);
  const [image, setImage] = useState(items.image);
  const [heading, setHeading] = useState(items.heading);
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/dynamic/updateProject/${items._id}`,
        { description, image, heading }
      );
      toast.success(response.data.message);
      setImage("");
      setDescription("");
      setHeading("");
      navigate("/admin/project");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="text-white px-16 py-20">
      <div className="my-6 flex justify-center">
        <form onSubmit={handleEdit} className="w-[650px] border p-6">
          <div className="my-3">
            <input
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Enter Image Url"
              name="image"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="image"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              placeholder="Enter Heading Here"
              name="heading"
              onChange={(e) => {
                setHeading(e.target.value);
              }}
              value={heading}
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="heading"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              placeholder="Enter description Here"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              name="description"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="description"
            />
          </div>
          <div className="my-3">
            <button className="bg-sky-500 p-2 w-full rounded">
              Update Slider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Project;
