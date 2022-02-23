import { MissingParamError } from "../erros/MissingParamErros";
import { badRequest } from "../helpers/httpHelpers";
import { HttpResponse, HttpRequest } from "../protocols/http";
class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const validate = SignUpController.validate(httpRequest.body);
        return validate;
    };
    private static validate({ name, email }: any): any {
        if (!name) {
            return badRequest(new MissingParamError('name'));
        };

        if (!email) {
            return badRequest(new MissingParamError('email'));
        };
    };
};


export { SignUpController };
