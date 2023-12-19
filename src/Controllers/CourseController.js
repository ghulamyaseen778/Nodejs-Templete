import { Batchs, Courses, Modules } from "../Models/CourseSchema.js";
import errList from "../helper/errList.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateCourses = async (req, res) => {
  let body = req.body;
  let id = req.user;
  console.log(await Courses.findOne({ slug: body.slug }));
  if (await Courses.findOne({ slug: body.slug })) {
    errHandler(res, "duplicate data", 400);
    return;
  }
  Courses.create({ ...body, userId: id._id })
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      errHandler(res, errList[5], 403);
    });
};

const GetCourses = (req, res) => {
  let {
    id,
    userId,
    title,
    duration,
    slug,
    isOpen,
    localPrice,
    internationalPrice,
    rating,
  } = req.query;
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

const CreateModule = async (req, res) => {
  let body = req.body;
  let id = req.user;
  if (await Modules.findOne({ title: body?.title, courseId: body.courseId })) {
    errHandler(res, "Duplicate Data", 500);
    return;
  } else {
    if (body?.courseId) {
      let data = await Courses.findOne({ _id: body?.courseId });
      console.log(Number(data.moduleIds.length) <= data.moduleLength);
      if (Number(data.moduleIds.length) < data.moduleLength) {
        Modules.create({ ...body, userId: id._id })
          .then(async (item) => {
            await Courses.findByIdAndUpdate(body?.courseId, {
              moduleIds: [...data.moduleIds, item._id],
            })
              .then(() => {
                responseHandler(res, item);
              })
              .catch(() => {
                errHandler(res, "Module Was Never Saved", 403);
              });
          })
          .catch((err) => {
            errHandler(res, errList[5], 403);
          });
      } else {
        errHandler(res, "Module limit", 400);
      }
    }
  }
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

function getNumbersInRange(start, end) {
  var numbers = [];

  for (var i = start; i <= end - 1; i++) {
    numbers.push(i);
  }

  return numbers;
}
function checkItsOk(usertiming, timing, res) {
  let bool = true;
  for (let i = 0; i < timing.length; i++) {
    const element = timing[i];
    console.log(element[0][1].split(":")[0].split("0")[1]);
    let range = getNumbersInRange(
      Number(
        element[0][0].split(":")[0][0] == "0"
          ? element[0][0].split(":")[0].split("0")[1]
          : element[0][0].split(":")[0]
      ),
      Number(
        element[0][1].split(":")[0][0] == "0"
          ? element[0][1].split(":")[0].split("0")[1]
          : element[0][1].split(":")[0]
      )
    );
    console.log(range);
    for (let j = 0; j < range.length; j++) {
      const elementJ = range[j];
      let UserTiming = getNumbersInRange(
        Number(
          usertiming[0][0].split(":")[0][0] == "0"
            ? usertiming[0][0].split(":")[0].split("0")[1]
            : usertiming[0][0].split(":")[0]
        ),
        Number(
          usertiming[0][1].split(":")[0][0] == "0"
            ? usertiming[0][1].split(":")[0].split("0")[1]
            : usertiming[0][1].split(":")[0]
        )
      );
      console.log(usertiming[0][0].split(":")[0].split("0")[1], "kk");
      for (let kk = 0; kk < UserTiming.length; kk++) {
        console.log("val");
        const elementK = UserTiming[kk];
        if (elementK == elementJ) {
          console.log(elementJ, "d");
          for (let day = 0; day < element[1].length; day++) {
            const elementDay = element[1][day];
            for (let AllDays = 0; AllDays < elementDay.length; AllDays++) {
              const elementAllDay = elementDay[AllDays];
              for (let FindDay = 0; FindDay < usertiming[1].length; FindDay++) {
                const elementFindDay = usertiming[1][FindDay];
                if (elementFindDay == elementAllDay) {
                  bool = false;
                  console.log("s");
                  // errHandler(res,"not avalible this timing",500)
                }
              }
            }
          }
        }
      }
    }
  }
  return bool;
}

const CreateBatch = async (req, res) => {
  let body = req.body;
  let id = req.user;
  if (body.batchTiming && body.moduleId) {
    //  let time = body.batchTiming[0]
    let batch = await Batchs.find({ moduleId: body.moduleId, openBatch: true });
    let timing = [
      [
        [8, 30, 12, "pm"],
        [8, 30, 12, "pm"],
        ["mon", "wed", "fri"],
      ],
      [
        [9, 30, 12, "pm"],
        [10, 30, 12, "pm"],
        ["mon", "wed", "fri"],
      ],
    ];
    let usertiming = [
      [8, 30, 12, "pm"],
      [6, 30, 12, "pm"],
      ["tue", "thu", "sat"],
    ];

    // console.log(checkItsOk(usertiming,timing,res),"pp")
    let bool = true;
    for (let i = 0; i < timing.length; i++) {
      const element = timing[i];
      if (element[0][0] == usertiming[0][0]) {
        if (element[0][1] == usertiming[0][1]) {
          if (element[0][2] == usertiming[0][2]) {
            for (let j = 0; j < element[2].length; j++) {
              const elementJ = element[2][j];
              for (let k = 0; k < usertiming[2].length; k++) {
                const elementK = usertiming[2][j];
                if (elementJ == elementK) {
                  bool = false;
                }
              }
            }
          }
        }
      }
    }
  }
  if (bool) {
    Batchs.create({ ...body, userId: id._id })
      .then((item) => {
        responseHandler(res, item);
      })
      .catch((err) => {
        errHandler(res, errList[5], 403);
      });
  }
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
  GetBatch,
};
