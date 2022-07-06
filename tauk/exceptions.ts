class TaukException extends Error {

    constructor(message: string) {
        super(message);

        // because we are extending a built-in class
        Object.setPrototypeOf(this, TaukException.prototype);
    }
}

class TaukTestMethodNotFoundException extends TaukException {
    constructor(message: string) {
        super(message);
    }
}


class TaukInvalidTypeException extends TaukException {
    constructor(message: string) {
        super(message);
    }
}
export {TaukException, TaukTestMethodNotFoundException, TaukInvalidTypeException}
