import { MissingParamError } from "../erros/MissingParamErros";
import { badRequest } from "../helpers/httpHelpers";
import { IController } from "../protocols/controller";
import { IHttpRequest, IHttpResponse } from "../protocols/http";
class SignUpController implements IController {
    handle(httpRequest: IHttpRequest): IHttpResponse {
        const validate = SignUpController.validate(httpRequest.body);
        return validate;
    };
    private static validate(body: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

        for (const field of requiredFields) {
            if ((!body[field])) {
                return badRequest(new MissingParamError(field));
            }
        };
    };
};

export { SignUpController };
