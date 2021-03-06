import { InvalidParamError, MissingParamError, ServerError } from "../erros";
import { IEmailValidator } from "../protocols";
import { SignUpController } from "./SignUpController";

interface StubTypes {
    sut: SignUpController,
    mailValidatorStub: IEmailValidator,
}

const makeSut = (): StubTypes => {
    class MailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    const mailValidatorStub = new MailValidatorStub();
    const sut = new SignUpController(mailValidatorStub);

    return { sut, mailValidatorStub }
};

describe('SignUpController.spec', () => {
    test('Should return 400 if no name is provided', () => {
        const { sut } = makeSut();

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
        const { sut } = makeSut();

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

    test('Should return 400 if no password is provided', () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email',
                name: 'any_name',
                passwordConfirmation: 'any_password_confirmation'
            }
        }
        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400);
        expect(httpReponse.body).toEqual(new MissingParamError('password'));
    });

    test('Should return 400 if no passwordConfirmation is provided', () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email',
                name: 'any_name',
                password: 'any_password',
            }
        }
        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400);
        expect(httpReponse.body).toEqual(new MissingParamError('passwordConfirmation'));
    });

    test('Should return 400 if an invalid email is provided', () => {
        const { sut, mailValidatorStub } = makeSut();

        const httpRequest = {
            body: {
                email: 'invalid_email',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        }

        jest
            .spyOn(mailValidatorStub, 'isValid')
            .mockReturnValueOnce(false)

        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(400);
        expect(httpReponse.body).toEqual(new InvalidParamError('email'));
    });

    test('Should call EmailValidator with correct email', () => {
        const { sut, mailValidatorStub } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        };

        const isValidSpy = jest.spyOn(mailValidatorStub, 'isValid');

        sut.handle(httpRequest);

        expect(isValidSpy).toHaveBeenCalledWith('any_email');
    });

    test('Should return 500 if EmailValidator throws', () => {
        const { sut, mailValidatorStub } = makeSut();

        const httpRequest = {
            body: {
                email: 'invalid_email',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        }

        jest
            .spyOn(mailValidatorStub, 'isValid')
            .mockImplementation(() => {
                throw new Error();
            })

        const httpReponse = sut.handle(httpRequest);

        expect(httpReponse.statusCode).toBe(500);
        expect(httpReponse.body).toEqual(new ServerError());
    });

    test('Should return 400 if no password confirmation falis', () => {
        const { sut, mailValidatorStub } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation'
            }
        };

        const httpReponse = sut.handle(httpRequest);

       expect(httpReponse.statusCode).toBe(400);
       expect(httpReponse.body).toEqual(new InvalidParamError('email'));
    });
});
