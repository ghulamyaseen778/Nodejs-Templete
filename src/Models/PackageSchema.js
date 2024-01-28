import mongoose from "mongoose";

const PackageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  group_size: {
    type: Number,
    default:0
  },
  locations: {
    type: Array,
    required:true
  },
  gallery:{
    type: Array,
    required:true
  },
  totalDays:{
    type: Number,
    required:true
  },
  totalNight:{
    type: Number,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  tripOutline:{
    type:String,
    default:""
  },
  month:{
    type:String,
    required:true
  },
  includes:{
    type:String,
    default:""
  },
  FAQ:{
    type:String,
    default:""
  },
  Activites:{
    type:String,
    default:""
  },
});

const Package = mongoose.model("package",PackageSchema)
export {Package}
