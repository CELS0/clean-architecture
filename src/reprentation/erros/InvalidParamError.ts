class InvalidParamError extends Error {
    constructor(paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = 'InvalidParamError'
    };
};

export { InvalidParamError } 