import http from "../http-common";

const createImage = (formData: FormData) => {
  return http.post<Promise<string>>("/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImage = (id: string) => {
  return http.put(`/image/delete/${id}`);
};

const ImageService = {
  createImage,
  deleteImage,
};

export default ImageService;
