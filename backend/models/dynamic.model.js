import mongoose from "mongoose";

const sliderSchema = mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    heading: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    heading: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  heading: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export const Slider = mongoose.model("slider", sliderSchema);
export const Team = mongoose.model("team", teamSchema);
export const Gallery = mongoose.model("gallery", gallerySchema);
export const Project = mongoose.model("project", projectSchema);
export const Event = mongoose.model("event", eventSchema);
