import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slug:{
      type:String,
      required:true
    },
    img:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog",BlogSchema)
export {Blog}