import mongoose from "mongoose";
import {
  Event,
  Gallery,
  Project,
  Slider,
  Team,
} from "../models/dynamic.model.js";

export const addSlider = async (req, res) => {
  const { image, heading, description } = req.body;
  if (!image || !heading || !description) {
    return res.status(404).json({
      message: "Please Enter all fields",
      success: false,
    });
  }

  try {
    const data = {
      image,
      description,
      heading,
    };
    const addSliderPart = await Slider(data);
    await addSliderPart.save();
    res.status(200).json({
      message: "Slider added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "While adding Slider Created Some issue",
      success: false,
      Error: error,
    });
  }
};

//fetch data from database
export const fetchAllSlider = async (req, res) => {
  try {
    const fetchImages = await Slider.find();
    res.status(200).json({
      message: "Fetch slider data successfully",
      success: true,
      data: fetchImages,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while fetching the data",
      success: false,
      Error: error,
    });
  }
};

//edit sliders data
export const editSliders = async (req, res) => {
  const { id } = req.params;
  const { heading, image, description } = req.body;
  try {
    const existData = await Slider.findByIdAndUpdate(
      id,
      {
        image,
        heading,
        description,
      },
      { new: true }
    );
    if (!existData) {
      return res
        .status(404)
        .json({ success: false, message: "Slider not found" });
    }
    res.json({
      success: true,
      message: "Slider updated successfully",
      data: existData,
    });
  } catch (error) {
    console.log("Error updating slider:", error);
    res.status(500).json({ success: false, message: "Error updating slider" });
  }
};

export const deleteSliders = async (req, res) => {
  const { id } = req.params;

  try {
    const searchIdExist = await Slider.findById(id);
    if (!searchIdExist) {
      return res.status(404).json({
        message: "Slider not exist in the db",
        success: false,
      });
    }

    const fetchSlider = await Slider.findByIdAndDelete(id);
    res.status(200).json({
      message: "Slider deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while deleting slider", error);
    res.status(404).json({
      message: "Error while deleting slider",
      success: false,
    });
  }
};

/** Gallery section start */
export const addEvent = async (req, res) => {
  const { image, heading, description } = req.body;
  try {
    const responseData = {
      image,
      description,
      heading,
    };
    if (!image || !description || !description) {
      return res.status(404).json({
        message: "Enter all fields",
        success: false,
      });
    }
    const addEvent = await Event(responseData);
    await addEvent.save();
    res.status(200).json({
      message: "Event added successfully",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: "Error while adding Event ",
      success: false,
    });
  }
};

export const fetchAllEvent = async (req, res) => {
  try {
    const response = await Event.find();
    res.status(200).json({
      message: "Fetch Event data successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error while fetching data", success: false });
  }
};

export const editEvent = async (req, res) => {
  const { id } = req.params;
  const { heading, description, image } = req.body;
  if (!heading || !description || !image) {
    return res.status(404).json({
      message: "Enter All Fields",
      success: false,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
      success: false,
    });
  }

  try {
    const updateEvent = await Event.findByIdAndUpdate(
      id,
      {
        heading,
        description,
        image,
      },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({
        message: "Event does not exist",
        success: false,
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while Updating Event ",
      success: false,
    });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Enter Invalid Id",
      success: false,
    });
  }
  try {
    const deleteEvent = await Event.findByIdAndDelete(id);
    if (!deleteEvent) {
      return res.status(404).json({
        message: "Event not exist",
        success: false,
      });
    }
    res.status(200).json({
      message: "Event deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while deleting Event",
      success: false,
    });
  }
};
/** Gallery section end */

/** Team section start */
export const addTeam = async (req, res) => {
  const { image, position, name } = req.body;
  if (!image || !position || !name) {
    return res.status(404).json({
      message: "Enter All fields",
      success: false,
    });
  }
  const data = {
    image,
    position,
    name,
  };
  try {
    const addTeam = await Team(data);
    await addTeam.save();
    res.status(200).json({
      message: "Team Created successfully",
      success: true,
      data: addTeam,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while Creating Team",
      success: false,
    });
  }
};

export const fetchAllTeam = async (req, res) => {
  try {
    const fetchTeams = await Team.find();
    res.status(200).json({
      message: "Fetch all Team from db",
      success: true,
      data: fetchTeams,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while fetching team",
      success: false,
    });
  }
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { image, position, name } = req.body;
  if (!image || !position || !name) {
    return res.status(404).json({
      message: "Enter all fields",
      success: false,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Enter Valid Id",
      success: false,
    });
  }

  try {
    const updateResponse = await Team.findByIdAndUpdate(
      id,
      { name, position, image },
      { new: true }
    );
    if (!updateResponse) {
      return res.status(404).json({
        message: "Error Occur while Updating",
        success: false,
      });
    }
    res.status(200).json({
      message: "Updated Team Successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while updating Team",
      success: false,
    });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid Id",
      success: false,
    });
  }
  try {
    const deleteTeams = await Team.findByIdAndDelete(id);
    if (!deleteTeams) {
      return res.status(404).json({
        message: "Team not exist on db",
        success: false,
      });
    }
    res.status(200).json({
      message: "Team delted successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while deleting team",
      success: false,
    });
  }
};
/** Team section end */

/** Gallery section start */
export const galleryAdd = async (req, res) => {
  const { image, name } = req.body;
  if (!image || !name) {
    return res.status(404).json({
      message: "Enter all fields",
      success: false,
    });
  }
  try {
    const galleryData = {
      image,
      name,
    };
    const responseData = await Gallery(galleryData);
    await responseData.save();
    res.status(200).json({
      message: "Gallery added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error while Adding Gallery Data",
      success: false,
    });
  }
};

export const fetchGallery = async (req, res) => {
  try {
    const fetchData = await Gallery.find();
    res.status(200).json({
      message: "Gallery Data Fetch Successfully",
      success: true,
      data: fetchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while fetching gallery data",
      success: false,
    });
  }
};

export const updateGallery = async (req, res) => {
  const { id } = req.params;
  const { image, name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid Id",
      success: false,
    });
  }
  if (!name || !image) {
    return res.status(404).json({
      message: "Enter Updated data Value",
      success: false,
    });
  }
  try {
    const updateData = { image, name };
    const updateGalleryData = await Gallery.findByIdAndUpdate(id, updateData);
    if (!updateGalleryData) {
      return res.status(404).json({
        message: "Gallery not exist in database",
        success: false,
      });
    }
    res.status(200).json({
      message: "Updated gallery successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error while updating Gallery",
      success: false,
    });
  }
};

export const deleteGallery = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid Id",
      success: false,
    });
  }
  try {
    const deletedData = await Gallery.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({
        message: "Gallery not exist on database",
        success: false,
      });
    }
    res.status(200).json({
      message: "Gallery deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error while deleting Gallery",
      success: false,
    });
  }
};
/** Gallery section end */

/** Project section start */
export const addProject = async (req, res) => {
  const { image, heading, description } = req.body;
  if (!image || !heading || !description) {
    return res.status(404).json({
      message: "Enter all fields",
      success: false,
    });
  }
  try {
    const projectData = {
      image,
      description,
      heading,
    };

    const addData = await Project(projectData);
    await addData.save();
    res.status(200).json({
      message: "Successfully created Projects",
      success: true,
      data: addData,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error while Creating Project",
      success: false,
    });
  }
};

export const fetchProjects = async (req, res) => {
  try {
    const fetchData = await Project.find();
    if (!fetchData) {
      return res.status(404).json({
        message: "Error while fetching data of project",
        success: false,
      });
    }
    res.status(200).json({
      message: "Project Fetch data successfully",
      success: true,
      data: fetchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error occur while fetching data of project",
      success: true,
    });
  }
};

export const updateProjects = async (req, res) => {
  const { id } = req.params;
  const { image, heading, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid Id",
      success: false,
    });
  }
  if (!image || !description || !heading) {
    return res.status(404).json({
      message: "Enter Updated data in input fields",
      success: false,
    });
  }
  try {
    const updateData = await Project.findByIdAndUpdate(
      id,
      { image, description, heading },
      { new: true }
    );
    if (!updateData) {
      return res.status(404).json({
        message: "Project not exist in database",
        success: false,
      });
    }
    res.status(200).json({
      message: "Project updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while updating projects",
      success: true,
    });
  }
};

export const deleteProjects = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid id",
      success: false,
    });
  }
  try {
    const deleteData = await Project.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({
        message: "ProjectId not exist in database",
        success: false,
      });
    }
    res.status(200).json({
      message: "Project deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while Deleteing project",
      success: false,
    });
  }
};
/** Project section end */
