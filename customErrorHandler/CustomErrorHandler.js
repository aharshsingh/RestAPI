// class CustomErrorHandler extends Error {

//     CustomErrorHandler(status, message){
//         this.status = status;
//         this.message = message;
//     }

//     static alreadyExits(message){
//         return new CustomErrorHandler(409, message);
//     }
    
// };

// Corrected CustomErrorHandler definition
class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExists(message) {
        return new CustomErrorHandler(409, message);
    }
}

module.exports = CustomErrorHandler;
