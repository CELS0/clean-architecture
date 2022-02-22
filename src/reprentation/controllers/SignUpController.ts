type IHttpRequest = {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
};

class SignUpController {
    handle(httpRequest: IHttpRequest): any {
        const validate = SignUpController.validate(httpRequest)
        return validate;
    };
    private static validate({ name, email }: IHttpRequest): any {
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


export { SignUpController, IHttpRequest };
