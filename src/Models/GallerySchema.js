import mongoose from "mongoose";

const GallerySchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["img", "vid"],
  },
  ids: {
    type: String,
  },
});

const Gallery = mongoose.model("gallery", GallerySchema);
export { Gallery };
