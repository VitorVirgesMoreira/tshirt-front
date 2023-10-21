import { ImageResponseModel } from "../image/image-response-model";

export interface TypeResponseModel {
  id: string;
  color: string;
  fabric: string;
  images: ImageResponseModel[];
}
