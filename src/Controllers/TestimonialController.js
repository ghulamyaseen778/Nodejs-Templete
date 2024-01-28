import { Testimonial } from "../Models/TestimonialSchema.js"
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js"

const CreateTestimonial = (req,res) =>{
    let body = req.body
    Testimonial.create(body).then((data)=>{
      responseHandler(res,data)
    }).catch((err) => {
      errHandler(res, errList[5], 403);
    });
}

const TestimonialDelete = (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  let { id } = req.query;
  Testimonial.findByIdAndDelete(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const TestimonialGet = (req, res) => {
  const body = req.body;
  let { id, } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  Testimonial.find(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

export {TestimonialGet,CreateTestimonial,TestimonialDelete}