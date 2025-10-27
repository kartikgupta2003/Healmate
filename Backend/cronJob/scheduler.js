const cron = require("node-cron");
const asyncHandler = require("express-async-handler");
const Prescription = require("../Models/prescriptionsModel");
const NotificationService = require("../src/service/notificationService");

const task=asyncHandler(async()=>{
    const pres = await Prescription.find({
        notificationsEnabled : true 
    });

    //("is this running ?");

    pres.forEach((pre)=>{
        const end_date = new Date(pre.startDate);
        end_date.setDate(end_date.getDate() + pre.durationInDays -1);
        end_date.setHours(23, 59, 59, 999);
        const now = new Date();
        // //(now , end_date);
        if(now <= end_date){
            // //(pre);
            pre.medicines.forEach((med)=>{
                const {name , frequencyPerDay , dosageAmount} = med;

                const interval = (24 * 60) / frequencyPerDay ;

                for(let i=0 ; i<frequencyPerDay ; i++){
                    const rightDate = new Date(pre.startDate);
                    rightDate.setMinutes(rightDate.getMinutes() + (i * interval));
                    // //(rightDate);
                    if(now.getHours() === rightDate.getHours() && now.getMinutes() === rightDate.getMinutes()){
                        // send notification to all the users who have a prescription schedule right now 
                        // req.user won’t exist in a cron job, because cron runs independently of requests.
                        //("pakda gaya 1");
                        const title = "Time for your medicine!" ;
                        const body = `It’s time to take ${name} - ${dosageAmount}.`;
                        NotificationService.sendNotification(pre.userId , title , body)
                    }
                }
            })
        }
    })
});

cron.schedule("* * * * *" , task);

