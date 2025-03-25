import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Team_Admin = () => {
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();
  /**Fetch data start */

  const fetchTeam = async () => {
    try {
      const teamData = await axios.post(
        "http://localhost:4000/dynamic/listTeam"
      );
      if (Array.isArray(teamData.data.data)) {
        setTeam(teamData.data.data);
      } else {
        console.log("Response data is not an array", teamData.data);
      }
    } catch (error) {
      console.log("Error fetching Team:", error);
    }
  };

  useEffect(() => {
    fetchTeam().catch((error) => console.log("Error in fetching team", error));
  }, []);

  const handleProject = async (event) => {
    event.preventDefault();
    try {
      const addTeam = await axios.post(
        "http://localhost:4000/dynamic/addTeam",
        { image, name, position }
      );

      toast.success(addTeam.data.message);
      setImage("");
      setPosition("");
      setName("");

      // Update Ui Instane
      setTeam((prev) => [...prev, addTeam.data.data]);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error while adding team", error);
    }
  };

  const handleEdit = async (itemId) => {
    console.log(itemId._id);
    navigate("/admin/editTeam", {
      state: { itemId },
    });
  };

  /** delete start */
  const handleDelete = async (items) => {
    console.log(items);
    try {
      const dataDelete = await axios.post(
        `http://localhost:4000/dynamic/deleteTeam/${items._id}`
      );

      // Update Ui Instane
      setTeam(team.filter((member) => member._id !== items._id));
      toast.success(dataDelete.data.message);
      console.log(dataDelete.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  /** delete end */

  return (
    <div className="text-white px-16 py-20 bg-black ">
      <div className=" flex justify-center mt-4 md:mt-14 items-center">
        <form
          onSubmit={handleProject}
          className="border p-5 w-full md:w-[450px]"
        >
          <div>
            <h3 className="text-white text-center text-3xl font-bold">
              Create Team
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
              name="position"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              placeholder="Enter Position Here"
              className="w-full bg-transparent border outline-none py-2 px-3"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
          {team.map((items, index) => (
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
                      handleEdit(items);
                    }}
                    className="bg-red-600 py-2 px-8"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleDelete(items);
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

export default Team_Admin;
