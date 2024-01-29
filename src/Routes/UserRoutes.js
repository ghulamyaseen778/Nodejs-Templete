import express from "express";
import {
  LoginUser,
  RegisterdUser,
  getUser,
} from "../Controllers/UserController.js";
import { checkToken, upload } from "../middleware/index.js";
import { imageUpload } from "../Controllers/ImageController.js";
import {
  ContactDelete,
  ContactGet,
  CreateContact,
  UpdateContact,
} from "../Controllers/ContactController.js";
import {
  CountryDelete,
  CountryGet,
  CreateCountry,
} from "../Controllers/CountrySchema.js";
import {
  BlogCreate,
  BlogDelete,
  BlogGet,
} from "../Controllers/BlogController.js";
import {
  CreatePackage,
  PackageDelete,
  PackageGet,
} from "../Controllers/PackageController.js";
import {
  CreateTestimonial,
  TestimonialDelete,
  TestimonialGet,
} from "../Controllers/TestimonialController.js";

const route = express.Router();

route.route("/registerd").post(RegisterdUser);
route.route("/login").post(LoginUser).get(checkToken, getUser);
route.route("/image").post(upload.array("files"), imageUpload);

route
  .route("/contact")
  .get(ContactGet)
  .post(CreateContact)
  .put(UpdateContact)
  .delete(ContactDelete);

route
  .route("/country")
  .get(CountryGet)
  .post(CreateCountry)
  .delete(checkToken,CountryDelete);
route
  .route("/blog")
  .get(BlogGet)
  .post(checkToken, BlogCreate)
  .delete(checkToken, BlogDelete);
route
  .route("/package")
  .get(PackageGet)
  .post(checkToken, CreatePackage)
  .delete(checkToken, PackageDelete);

route
  .route("/testimonail")
  .get(TestimonialGet)
  .post(checkToken, CreateTestimonial)
  .delete(checkToken, TestimonialDelete);

export default route;
