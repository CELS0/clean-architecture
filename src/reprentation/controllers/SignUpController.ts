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
        }
    }
};


export { SignUpController, IHttpRequest };
