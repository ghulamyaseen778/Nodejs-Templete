import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Storage } from "../Config/firebase.config.js";
import { responseHandler } from "../helper/response.js";

const imageUpload = async (req, res) => {
  console.log(req.body, "ff");
  console.log(req.files ? req.files : null);
  let arr = []
  for (let index = 0; index < req.files.length; index++) {
    const file = req.files[index];
    const metadata = {
      contentType: file.mimetype,
    };
    const storageRef = ref(
      Storage,
      `uploads/${file.fieldname + "_" + Date.now()}`
    );
    console.log(storageRef);
    //     const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    await uploadBytesResumable(storageRef, file.buffer, metadata).then(
      async (snap) => {
        console.log("success");
       await getDownloadURL(storageRef).then((url) => {
          // responseHandler(res, { image: url });
          arr.push(url)
        });
      }
    );
  }
  responseHandler(res,arr)
};

export { imageUpload };
