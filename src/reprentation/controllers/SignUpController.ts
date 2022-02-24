import { InvalidParamError, MissingParamError } from "../erros";
import { badRequest, serverError } from "../helpers/httpHelpers";
import { IHttpRequest, IHttpResponse, IController, IEmailValidator } from "../protocols";
class SignUpController implements IController {
    constructor(private emailValidator: IEmailValidator) { }

    handle(httpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

        try {
            const { email, password, passwordConfirmation } = httpRequest.body;

            for (const field of requiredFields) {
                if ((!httpRequest.body[field])) {
                    return badRequest(new MissingParamError(field));
                }
            };

            const isValidEmail = this.emailValidator.isValid(email)
            if (!isValidEmail) {
                return badRequest(new InvalidParamError('email'));
            };

            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('email'));
            }

        } catch (err) {
            return serverError();
        }
    };
};

export { SignUpController };
