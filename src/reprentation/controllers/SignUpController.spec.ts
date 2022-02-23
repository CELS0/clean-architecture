import { MissingParamError } from "../erros/MissingParamErros";
import { SignUpController } from "./SignUpController";

describe('SignUpController.spec', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        }
        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400);
        expect(httpReponse.body).toEqual(new MissingParamError('name'));
    });

    test('Should return 400 if no email is provided', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        }
        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400);
        expect(httpReponse.body).toEqual(new MissingParamError('email'));
    });
});
