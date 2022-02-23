import { HttpResponse, HttpRequest } from "../protocols/http";
class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const validate = SignUpController.validate(httpRequest.body);
        return validate;
    };
    private static validate({ name, email }: any): any {
        if (!name) {
            return {
                statusCode: 400,
                body: new Error('Missing param: name')
            };
        }
        if (!email) {
            return {
                statusCode: 400,
                body: new Error('Missing param: email')
            };
        }
    }
};


export { SignUpController };
