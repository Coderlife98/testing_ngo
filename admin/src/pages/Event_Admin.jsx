import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Event_Admin = () => {
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [eventShow, setEventShow] = useState([]);
  const navigate = useNavigate();
  const fetchEventData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/listEvent"
      );
      setEventShow(response.data.data);
    } catch (error) {
      console.log("Error fetching sliders:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  /** Added Event start */
  const handleEvent = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/dynamic/addEvent",
      { image, heading, description }
    );
    setImage(""), setHeading(""), setDescription("");
    console.log("Event added successfully");
    // 🔹 Fetch latest data after adding new event
    fetchEventData();
  };
  /** Added event ended */

  /** Delete event start */
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const deleteData = await axios.post(
        `http://localhost:4000/dynamic/deleteEvent/${id}`
      );
      console.log("deleted events");
      fetchEventData();
    } catch (error) {
      console.log(error);
    }
  };
  /** Delete event end */

  /** Edit event start */
  const handleEventEdit = (items) => {
    navigate("/admin/editEvent", { state: { items } });
  };
  /** Edit event end */

  return (
    <div className="text-white px-16 py-20 bg-black ">
      <div className=" flex justify-center mt-4 md:mt-14 items-center">
        <form onSubmit={handleEvent} className="border p-5 w-full md:w-[450px]">
          <div>
            <h3 className="text-white text-center text-3xl font-bold">
              Create Event
            </h3>
          </div>
          <div className="my-3">
            <input
              type="text"
              onChange={(e) => {
                setImage(e.target.value);
              }}
              name="image"
              value={image}
              placeholder="Enter images url"
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
              }}
              name="heading"
              placeholder="Enter Heading"
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter Description"
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
        {eventShow.length > 0 ? (
          <div className="grid md:grid-cols-3">
            {eventShow.map((items, index) => (
              <div key={index}>
                <div className="border p-4 m-6">
                  <div>
                    <img src={items.image} alt="" />
                  </div>
                  <div className="my-4">
                    <h2 className="text-center font-bold text-2xl">
                      {items.heading}
                    </h2>
                  </div>
                  <div className="">
                    <p className="text-center">{items.description}</p>
                  </div>
                  <div className="my-4 flex justify-between">
                    <div>
                      <button
                        to="/editEvent"
                        onClick={() => {
                          handleEventEdit(items);
                        }}
                        className="bg-red-600 py-2 px-8"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleDelete(items._id);
                        }}
                        className="bg-green-600 py-2 px-8"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No Event Exist in database"
        )}
      </div>
    </div>
  );
};

export default Event_Admin;
