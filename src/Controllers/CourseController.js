import { Batchs, Courses, Modules } from "../Models/CourseSchema.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateCourses = (req, res) => {
  let body = req.body;
  let id = req.user;
  Courses.create({ ...body, userId: id })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const GetCourses = (req, res) => {
  let { id, userId, title, duration, slug, isOpen, localPrice } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (title) {
    obj.title = title;
  }
  if (slug) {
    obj.slug = slug;
  }
  if (duration) {
    obj.duration = duration;
  }
  if (!isOpen) {
    obj.isOpen = true;
  }
  if (localPrice) {
    obj.localPrice = localPrice;
  }
  if (internationalPrice) {
    obj.internationalPrice = internationalPrice;
  }
  if (rating) {
    obj.rating = rating;
  }
  Courses.find(obj)
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

const EditCourses = (req, res) => {
  let body = req.body;
  let { id } = req.params;
  Courses.findByIdAndUpdate(id, body, { new: true })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

const CreateModule = (req, res) => {
  let body = req.body;
  let id = req.user;
  Modules.create({ ...body, userId: id })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const EditModules = (req, res) => {
  let body = req.body;
  let { id } = req.params;
  Modules.findByIdAndUpdate(id, body, { new: true })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

const GetModules = (req, res) => {
  let { id, courseId, userId, duration } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (courseId) {
    obj.courseId = courseId;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (duration) {
    obj.duration = duration;
  }
  Modules.find(obj)
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

const CreateBatch = (req, res) => {
  let body = req.body;
  let id = req.user;
  Batchs.create({ ...body, userId: id })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const EditBatch = (req, res) => {
  let body = req.body;
  let { id } = req.params;
  Batchs.findByIdAndUpdate(id, body, { new: true })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

const GetBatch = (req, res) => {
  let { id, courseId, userId, duration, moduleId, openBatch, classType } =
    req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (courseId) {
    obj.courseId = courseId;
  }
  if (moduleId) {
    obj.moduleId = moduleId;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (duration) {
    obj.duration = duration;
  }
  if (!openBatch) {
    obj.openBatch = true;
  }
  if (classType) {
    obj.classType = classType;
  }
  if (batchType) {
    obj.batchType = batchType;
  }
  Batchs.find(obj)
    .then((item) => {
      responseHandler(res, item);
    })
    .catch(() => {
      errHandler(res, errList[5], 403);
    });
};

export {
  CreateCourses,
  EditCourses,
  GetCourses,
  CreateModule,
  EditModules,
  GetModules,
  CreateBatch,
  EditBatch,
  GetBatch
};
