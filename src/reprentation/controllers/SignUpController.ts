import { InvalidParamError, MissingParamError } from "../erros";
import { badRequest } from "../helpers/httpHelpers";
import { IController } from "../protocols/controller";
import { IEmailValidator } from "../protocols/emailValidator";
import { IHttpRequest, IHttpResponse } from "../protocols/http";
class SignUpController implements IController {
    constructor(private emailValidator: IEmailValidator) { }

    handle(httpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

        for (const field of requiredFields) {
            if ((!httpRequest.body[field])) {
                return badRequest(new MissingParamError(field));
            }
        };

        const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

        if (!isValidEmail) {
            return badRequest(new InvalidParamError('email'));
        };
    };
};

export { SignUpController };
