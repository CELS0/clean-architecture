import { MissingParamError } from "../erros/MissingParamErros";
import { badRequest } from "../helpers/httpHelpers";
import { HttpResponse, HttpRequest } from "../protocols/http";
class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const validate = SignUpController.validate(httpRequest.body);
        return validate;
    };
    private static validate(body: any): any {
        const requiredFields = ['name', 'email','password','passwordConfirmation'];

        for (const field of requiredFields) {
            if ((!body[field])) {
                return badRequest(new MissingParamError(field));
            }
        };
    };
};


export { SignUpController };
