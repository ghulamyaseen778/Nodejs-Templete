import mongoose, { model } from "mongoose";

const CourseRegistrationSchema = mongoose.Schema({
  cousrseId: {
    type: String,
    required: true,
  },
  moduleIds: {
    type: Array,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileUri: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  address: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
    enum: [
      "Bachelor's",
      "Matric",
      "Under Matric",
      "Intermidate",
      "Under Intermidate",
    ],
  },
  totalPrice: {
    type: String,
    required: true,
  },
});

const CourseRegistration = mongoose.model(
  "courseRegistration",
  CourseRegistrationSchema
);
export { CourseRegistration };
