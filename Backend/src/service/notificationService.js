const admin = require("../util/firebase");
const User = require("../../Models/userModel");

class NotificationService{
    static async sendNotification(id , title , body){
        let deviceToken;
        try{
            const user = await User.findById(id);
            deviceToken = user.token;
        }catch(err){
            throw err ;
        }
        // console.log("token bkl " , deviceToken);
        const message = {
            notification : {
                title ,
                body
            },
            token : deviceToken
        }
        try{
            const res= await admin.messaging().send(message);
            return res;
        }catch(err){
            throw err ;
        }
    }
}

module.exports = NotificationService;