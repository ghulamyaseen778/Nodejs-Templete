import express from "express";
import { LoginUser, RegisterdUser, getUser } from "../Controllers/UserController.js";
import { checkToken, upload } from "../middleware/index.js";
import { imageUpload } from "../Controllers/ImageController.js";
import {
  CreateBatch,
  CreateCourses,
  CreateModule,
  EditBatch,
  EditCourses,
  EditModules,
  GetBatch,
  GetCourses,
  GetModules,
} from "../Controllers/CourseController.js";

const route = express.Router();

route.route("/registerd").post(RegisterdUser);
route.route("/login").post(LoginUser).get(checkToken,getUser);
route.route("/image").post(upload.single("file"), imageUpload);
route
  .route("/course")
  .post(checkToken, CreateCourses)
  .get(GetCourses)
  .put(checkToken, EditCourses);
route
  .route("/module")
  .get(GetModules)
  .post(checkToken, CreateModule)
  .put(checkToken, EditModules);

route
  .route("/batch")
  .get(GetBatch)
  .post(checkToken, CreateBatch)
  .put(checkToken, EditBatch);

export default route;
