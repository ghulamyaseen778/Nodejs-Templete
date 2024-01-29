import { Country } from "../Models/CountrySchema.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateCountry = (req, res) => {
  const body = req.body;
  console.log(body)
  Country.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const UpdateCountry = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Country.findByIdAndUpdate(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const CountryDelete = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Country.findByIdAndDelete(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const CountryGet = (req, res) => {
  const body = req.body;
  // const { _id } = req.user;
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
  Country.find(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

export { CountryDelete, CreateCountry, UpdateCountry, CountryGet };
