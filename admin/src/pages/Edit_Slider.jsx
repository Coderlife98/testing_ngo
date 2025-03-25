import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Edit_Slider = () => {
  const location = useLocation(); // Get the state from the previous page
  const { sliders } = location.state; // slider data
  const navigate = useNavigate();
  console.log("slider data", sliders);
  const [image, setImage] = useState(sliders.image);
  const [heading, setHeading] = useState(sliders.heading);
  const [description, setDescription] = useState(sliders.description);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API request to update the slider
      const response = await axios.post(
        `http://localhost:4000/dynamic/edit/${sliders._id}`,
        {
          image,
          heading,
          description,
        }
      );
      setImage("");
      setHeading("");
      setDescription("");
      navigate("/admin/slider");
      console.log("Slider updated successfully");
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };
  return (
    <div className="text-white px-16 py-20">
      <div className="my-6 flex justify-center">
        <form onSubmit={handleSubmit} className="w-[650px] border p-6">
          <div className="my-3">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              name="image"
              placeholder="Enter Image Url"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="image"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              onChange={(e) => setHeading(e.target.value)}
              value={heading}
              placeholder="Enter Heading"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              name="heading"
              id="heading"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Enter Description"
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              name="description"
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

export default Edit_Slider;
