import { IHttpRequest, SignUpController } from "./SignUpController";

describe('SignUpController.spec', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController();
        const httpRequest: IHttpRequest = {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            passwordConfirmation: 'any_password_confirmation'
        }
        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400)
    });
});
