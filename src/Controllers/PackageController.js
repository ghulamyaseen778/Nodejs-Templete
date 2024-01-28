import { Package } from "../Models/PackageSchema.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreatePackage = async (req, res) => {
  const body = req.body;
  if (Package && (await Package.findOne({ slug: body.slug }))) {
    errHandler(res, "already exists", 403);
    return;
  }
  Package.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err)
      errHandler(res, errList[5], 403);
    });
};

const UpdatePackage = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Package.findByIdAndUpdate(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const PackageDelete = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Package.findByIdAndDelete(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const PackageGet = (req, res) => {
  const body = req.body;
  let { id, name, email } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (name) {
    obj.name = name;
  }
  if (email) {
    obj.email = email;
  }
  Package.find(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

export {CreatePackage,UpdatePackage,PackageGet,PackageDelete}
