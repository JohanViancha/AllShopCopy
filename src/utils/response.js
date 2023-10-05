const errorMap = new Map([
  [200, "successful request"],
  [201, "record created successfully"],
  [401, "invalid email and/or password"],
  [403, "user has not been verified"],
  [404, "resource not found"],
  [409, "record already exists"],
]);

const responseHttp = ({ codeResponse = 0, data = [], message }) => {
  return {
    codeResponse: codeResponse,
    message: errorMap.get(codeResponse) || message,
    data,
  };
};

module.exports = responseHttp;
