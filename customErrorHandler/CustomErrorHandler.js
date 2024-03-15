class CustomErrorHandler extends Error {

    CustomErrorHandler(status, message){
        this.status = status;
        this.message = message;
    }

    static alreadyExits(message){
        return new CustomErrorHandler(409, message);
    }
    
};