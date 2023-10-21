import { TypeResponseModel } from "../../models/type/type-response-model";
import http from "../http-common";

const getTypesByTshirtId = (tshirtId: string) => {
  return http.get<Array<TypeResponseModel>>(`/type/${tshirtId}`);
};

const TypeService = {
  getTypesByTshirtId
};

export default TypeService;
