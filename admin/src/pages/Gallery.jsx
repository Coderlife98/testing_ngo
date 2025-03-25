import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Gallery = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchGallery();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/addGallery",
        { name, image }
      );
      setName("");
      setImage("");
      toast.success(response.data.message);
      console.log(response);
      fetchGallery();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const fetchGallery = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/allGalleryData"
      );
      setData(response.data.data);

      // toast.success(response.data.message)
      console.log(response.data.message);
    } catch (error) {}
  };
  const deleteGallery = async (items) => {
    const { _id } = items;
    try {
      console.log(_id);
      const response = await axios.delete(
        `http://localhost:4000/dynamic/deleteGallery/${_id}`
      );
      toast.success(response.data.message);
      fetchGallery();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const editGallery = async (items) => {
    navigate("/admin/editGallery", { state: { items } });
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
              Create Gallery
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
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name Here"
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
                  {items.name}
                </h3>
              </div>
              <div>
                <h3 className="text-center text-2xl">{items.position}</h3>
              </div>
              <div className="my-4 flex justify-between">
                <div>
                  <button
                    onClick={() => {
                      editGallery(items);
                    }}
                    className="bg-red-600 py-2 px-8"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteGallery(items);
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

export default Gallery;
