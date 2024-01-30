import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
    });

    //file has been sucessfully
    // console.log("file is uploaded in clodinary", response);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    //remove the locally saved temporary file when the uoload is failed

    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    await cloudinary.uploader.destroy(
      public_id,
      {
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return `Error deleting files, ${error}`;
        } else {
          return `File deleted successfully,${result}`;
        }
      }
    );
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });
