import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  localPrice: {
    type: String,
    required: true,
  },
  internationalPrice: {
    type: String,
    required: true,
  },
  moduleLength: {
    type: Number,
    default: 1,
  },
  moduleIds: {
    type: Array,
  },
  imgUri: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
    // required: true,
  },
});

const ModuleSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  curriculum: {
    type: Array,
    required: true,
  },
});

const BatchSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  moduleId: {
    type: String,
    required: true,
  },
  localPrice: {
    type: String,
    required: true,
  },
  internationalPrice: {
    type: String,
    required: true,
  },
  registrationOnClosed: {
    type: String,
    required: true,
  },
  batchType: {
    type: String,
    required: true,
    enum:["weekend","weekdays"]
  },
  openBatch: {
    type: Boolean,
    default: true,
  },
  avaliableSeats: {
    type: Number,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    enum: ["physical", "online"],
  },
  onStartDate: {
    type: String,
    required: true,
  },
  onWorking: {
    type: Array,
    default: ["1", "2"], //1 local , 2 international
  },
  batchTiming:{
    type:Array,
    required:true
  }//format: HH:MM:SS a,Days: mon,wen,tue,thu,fri,sat,sun
});

const Courses = mongoose.model("course", CourseSchema);
const Modules = mongoose.model("module", ModuleSchema);
const Batchs = mongoose.model("batch", BatchSchema);

export { Courses, Modules, Batchs };
