import mongoose from "mongoose";

const TestimonialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("testimonial",TestimonialSchema)
export {Testimonial}
