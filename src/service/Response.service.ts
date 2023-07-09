import { DTOResponse } from "../dto/DTOResponse.dto";

export default class Response {
  success(data: any): DTOResponse {
    return {
      success: 1,
      data: data,
      statusCode: 200,
    };
  }

  fail(statusCode: number, data: any): DTOResponse {
    return {
      success: 0,
      data: data,
      statusCode: statusCode,
    };
  }

  debug(data: any): DTOResponse {
    return {
      success: 0,
      data: data,
      statusCode: 504,
    };
  }
}
