type IHttpRequest = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

class SignUpController {
    handle(httpRequest: IHttpRequest): any {

        return {
            statusCode: 400,
            body: new Error('Missing param: name')
        };
    };
};


export { SignUpController, IHttpRequest };
