import { TshirtResponseModel } from "../../models/tshirt/tshirt-response-model";
import http from "../http-common";

const getAll = () => {
  return http.get<Array<TshirtResponseModel>>("/tshirt");
};

const TshirtService = {
  getAll
};

export default TshirtService;
