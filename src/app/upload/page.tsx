"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

type CloudinaryResult = {
  public_id: string;
};

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && <CldImage src={publicId} width={250} height={150} alt="cloudinary image" />}
      <CldUploadWidget
        uploadPreset="stgf20k4"
        onUpload={(result) => {
          console.log(result);
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
