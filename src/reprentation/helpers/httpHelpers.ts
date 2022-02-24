import { ServerError } from "../erros";
import { IHttpResponse } from "../protocols/http";

const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

const serverError = (): IHttpResponse => ({
    statusCode: 500,
    body: new ServerError(),
});


export { badRequest, serverError };