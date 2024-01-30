import { Gallery } from "../Models/GallerySchema.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateGallery = (req, res) => {
  let body = req.body;
  Gallery.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
        console.log(err)
      errHandler(res, "Not Created", 403);
    });
};

const GetGallery = (req, res) => {
  let { type } = req.query;
  let obj = {};
  if (type) {
    obj.type = type;
  }
  Gallery.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, "Not Created", 403);
    });
};

const DeleteGallery = (req,res) =>{
    let {id} = req.query
    Gallery.findByIdAndDelete(id)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, "Not Created", 403);
    });
}

export {CreateGallery,GetGallery,DeleteGallery}
