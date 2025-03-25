import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit_Gallery = () => {
  const location = useLocation();
  const { items } = location.state;
  const [name, setName] = useState(items.name);
  const [image, setImage] = useState(items.image);
  const navigate = useNavigate();
  const handleEdit = async (event) => {
    event.preventDefault();
    const { _id } = items;
    console.log("dgf", _id);
    try {
      const response = await axios.put(
        `http://localhost:4000/dynamic/updateGallery/${_id}`,
        { name, image }
      );
      setImage("");
      setName("");
      toast.success(response.data.message);
      navigate("/admin/gallery");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
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
                className="py-2 w-full bg-transparent border rounded text-white px-2"
                id="image"
              />
            </div>

            <div className="my-3">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                placeholder="Enter Name Here"
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
    </div>
  );
};

export default Edit_Gallery;
