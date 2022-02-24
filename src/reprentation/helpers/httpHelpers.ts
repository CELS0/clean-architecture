import { IHttpResponse } from "../protocols/http";

const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

const serverError = (error: Error): IHttpResponse => ({
    statusCode: 500,
    body: error,
});


export { badRequest, serverError };