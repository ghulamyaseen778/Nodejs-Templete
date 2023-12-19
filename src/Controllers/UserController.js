import jsonwebtoken from "jsonwebtoken";
import User from "../Models/UserSchema.js";
import { errHandler, responseHandler } from "../helper/response.js";

const RegisterdUser = async (req, res) => {
  console.log(req.body, "hello");
  let { name, email, password, role, acsses } = req.body;
  if (User && (await User.findOne({ email }))) {
    errHandler(res, 1, 403);
    return;
  } else if (password?.trim().length < 8) {
    errHandler(res, 2, 403);
    return;
  } else if (name?.trim().length < 3) {
    errHandler(res, 3, 403);
    return;
  }

  User.create({
    name,
    email,
    password,
    role,
    acsses,
  })
    .then((data) => {
      let { name, email, password, _id, createdAt, role, acsses } = data;
      let token = jsonwebtoken.sign(
        { name, email, password, _id, createdAt, role, acsses },
        process.env.SECRET_KEY
      );
      responseHandler(res, {
        name,
        email,
        password,
        _id,
        createdAt,
        token,
        role,
        acsses,
      });
    })
    .catch((err) => {
      errHandler(res, 5, 409);
      console.log(err);
    });
};

const LoginUser = (req, res) => {
  let { email, password } = req.body;
  if (password.trim().length < 8) {
    errHandler(res, 2, 403);
    return;
  }
  User.findOne({ email,password })
    .then((data) => {
      let { name, email, password, _id, createdAt, role, acsses } = data;
      let token = jsonwebtoken.sign(
        { name, email, password, _id, createdAt, role, acsses },
        process.env.SECRET_KEY
      );
      responseHandler(res, {
        name,
        email,
        password,
        _id,
        createdAt,
        token,
        role,
        acsses,
      });
    })
    .catch((err) => {
      errHandler(res, 5, 409);
    });
};
const getUser = (req,res)=>{
  responseHandler(res,req.user)
}

export { RegisterdUser, LoginUser,getUser };
