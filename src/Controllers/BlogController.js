import { Blog } from "../Models/BlogSchema.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const BlogCreate = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  console.log(body)
  Blog.create({ ...body, userId: _id })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
      console.log(err)
    });
};

const BlogUpdate = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Blog.findByIdAndUpdate(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const BlogGet = (req, res) => {
  const body = req.body;
  // const { _id } = req.user;
  let { id, userId,slug } = req.query;
  let obj = {};
  if (userId) {
    obj.userId = userId;
  }
  if (slug) {
    obj.slug = slug;
  }
  if (id) {
    obj._id = id;
  }
  Blog.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const BlogDelete = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Blog.findByIdAndDelete(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err)
      errHandler(res, errList[5], 403);
    });
};

export { BlogCreate, BlogGet, BlogUpdate, BlogDelete };
