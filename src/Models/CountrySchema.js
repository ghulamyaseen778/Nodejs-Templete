import mongoose from "mongoose";

const CountrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model("country",CountrySchema)
export {Country}