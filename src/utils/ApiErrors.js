class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
        
    ){
        super(message) //calls the parent Error class constructor to set the error message and enable native error features
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success =false
        this.errors=errors

        if(stack){
            this.stack=stack
        }
        else{
            //this is the default behavoiur when no custom stack is provided 
            //it creates the clean stack trace and assigns it to the this.stack 
            //the second argument(this.constructor) tells it to skip this constructor function from the stack trace 
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}