import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Edit_Event = () => {
  const location = useLocation();
  const { items } = location.state;
  const navigate = useNavigate();
  const [image, setImage] = useState(items.image);
  const [heading, setHeading] = useState(items.heading);
  const [description, setDescription] = useState(items.description);
  const updateEvents = async (event) => {
    event.preventDefault();
    try {
      const updateData = await axios.post(
        `http://localhost:4000/dynamic/editEvent/${items._id}`,
        {
          image,
          heading,
          description,
        }
      );
      setImage("");
      setHeading("");
      setDescription("");
      console.log("Slider updated successfully");
      navigate("/admin/event");
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };
  return (
    <div className="text-white px-16 py-20">
      <div className="my-6 flex justify-center">
        <form onSubmit={updateEvents} className="w-[650px] border p-6">
          <div className="my-3">
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Enter Image Url"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="image"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              value={heading}
              name="heading"
              onChange={(e) => {
                setHeading(e.target.value);
              }}
              placeholder="Enter Heading"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="heading"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              value={description}
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter Description"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="description"
            />
          </div>
          <div className="my-3">
            <button className="bg-sky-500 p-2 w-full rounded">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Event;
