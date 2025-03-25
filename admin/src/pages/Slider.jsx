import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Slider = () => {
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [sliders, setSliders] = useState([]); // State to store sliders from database
  const [editingSlider, setEditingSlider] = useState(null);
  const navigate = useNavigate();
  /** Fetch existing sliders when the component mounts */
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dynamic/allSlider"
        );

        // Log the response to check the data format
        console.log(response.data);

        // Check if the response is an array
        if (Array.isArray(response.data.data)) {
          setSliders(response.data.data);
        } else {
          console.log("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.log("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, []);

  const handleSlider = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/dynamic/add", {
        image,
        heading,
        description,
      });

      // Clear the form fields
      setImage("");
      setHeading("");
      setDescription("");

      console.log("Added slider successfully");

      // Optionally, you can fetch sliders again after adding
      const fetchSliders = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/dynamic/allSlider"
          );
          setSliders(response.data.data);
        } catch (error) {
          console.log("Error fetching sliders:", error);
        }
      };
      fetchSliders();
    } catch (error) {
      console.log("Error adding slider:", error);
    }
  };

  const handleEdit = (sliders) => {
    console.log("refers", sliders);
    navigate("/admin/edit", { state: { sliders } }); // Pass slider data to the /edit route
  };

  const handleDelete = async (item) => {
    try {
      console.log(`http://localhost:4000/dynamic/delete/${item._id}`);
      const deleteSlider = await axios.post(
        `http://localhost:4000/dynamic/delete/${item._id}`
      );
      console.log("successfully delete sliders");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.log("Error occur while deleting Slider");
    }
  };

  return (
    <div className="text-white px-16 py-20">
      <div className="my-6 flex justify-center">
        <form onSubmit={handleSlider} className="w-[650px] border p-6">
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
              Add Slider
            </button>
          </div>
        </form>
      </div>

      {/* Display existing sliders */}
      <div className="mx-16">
        <div className="grid gap-4 my-14 md:grid-cols-3">
          {sliders.length > 0 ? (
            sliders.map((item, index) => (
              <div key={index} className="border p-6">
                <div>
                  <img
                    src={item.image}
                    className="w-full object-cover rounded-lg h-44"
                    alt={item.heading}
                  />
                </div>
                <div>
                  <h3 className="text-3xl py-3">{item.heading}</h3>
                  <p className="text-justify">{item.description}</p>
                </div>
                <div className="flex justify-between my-4">
                  <button
                    to="/admin/edit"
                    onClick={() => {
                      handleEdit(item);
                    }}
                    className="bg-red-500 py-2 px-14 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item);
                    }}
                    className="bg-green-500 rounded-full py-2 px-14"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No sliders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
