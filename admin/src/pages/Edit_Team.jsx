import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Edit_Team = () => {
  const location = useLocation();
  const { itemId } = location.state;

  const navigate = useNavigate();
  const [name, setName] = useState(itemId.name);
  const [position, setPosition] = useState(itemId.position);
  const [image, setImage] = useState(itemId.image);
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/dynamic/updateTeam/${itemId._id}`,
        { name, position, image }
      );
      setImage("");
      setPosition("");
      setImage("");
      navigate("/admin/team");

      toast.success(response.data.message);
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
              placeholder="Enter Position Here"
              name="position"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              value={position}
              className="py-2 w-full bg-transparent border rounded text-white px-2"
              id="heading"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              placeholder="Enter Name Here"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
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

export default Edit_Team;
