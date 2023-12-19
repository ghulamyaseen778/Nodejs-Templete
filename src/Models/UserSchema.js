import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      required: true,
      enum: ["admin", "manger","sub"],
    },
    acsses: {
      type: [String],
      enum: [
        "course",
        "module",
        "batch",
        "course-action",
        "module-action",
        "batch-action",
        "check-student",
        "pay-btn",
        "all"
      ],
      // create-courses,create-modules,create-batch,action-on-courses,action-on-modules,action-batch,check-student
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
