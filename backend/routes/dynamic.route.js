import express from "express";
import {
  addEvent,
  addProject,
  addSlider,
  addTeam,
  deleteEvent,
  deleteGallery,
  deleteProjects,
  deleteSliders,
  deleteTeam,
  editEvent,
  editSliders,
  fetchAllEvent,
  fetchAllSlider,
  fetchAllTeam,
  fetchGallery,
  fetchProjects,
  galleryAdd,
  updateGallery,
  updateProjects,
  updateTeam,
} from "../controller/dynamic.controller.js";
const router = express.Router();

router.post("/add", addSlider);
router.get("/allSlider", fetchAllSlider);
router.post("/edit/:id", editSliders);
router.post("/delete/:id", deleteSliders);
router.post("/addEvent", addEvent);
router.post("/listEvent", fetchAllEvent);
router.post("/editEvent/:id", editEvent);
router.post("/deleteEvent/:id", deleteEvent);
router.post("/addTeam", addTeam);
router.post("/listTeam", fetchAllTeam);
router.post("/deleteTeam/:id", deleteTeam);
router.post("/updateTeam/:id", updateTeam);
router.post("/addGallery", galleryAdd);
router.post("/allGalleryData", fetchGallery);
router.put("/updateGallery/:id", updateGallery);
router.delete("/deleteGallery/:id", deleteGallery);
router.post("/addProject", addProject);
router.post("/fetchProject", fetchProjects);
router.post("/updateProject/:id", updateProjects);
router.post("/deleteProject/:id", deleteProjects);
export default router;
