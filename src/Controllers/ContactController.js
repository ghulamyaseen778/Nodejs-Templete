import { ContactUs } from "../Models/ContactUs.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateContact = (req, res) => {
  const body = req.body;
  ContactUs.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err)
      errHandler(res, errList[5], 403);
    });
};

const UpdateContact = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  ContactUs.findByIdAndUpdate(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const ContactDelete = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  ContactUs.findByIdAndUpdate(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const ContactGet = (req, res) => {
  const body = req.body;
  let { id, name,email } = req.query;
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
  ContactUs.find(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

export {UpdateContact,ContactGet,ContactDelete,CreateContact}