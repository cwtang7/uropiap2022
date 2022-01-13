//basic version
//prints received webhooks to console, webhooks must be send to http://44.201.151.195:3000/hook
/*
Assume webhook is:{
  phoneNumber:
  content:
}
*/
const questions=["You participated in a clay pot cooler training. Do you use a clay pot cooler? At any point in the survey, you can reply STOP to end the survey.\n 1. Yes\n 2. No",
"What type of clay pot cooler do you use?\n1. Clay pot-in-clay pot\n2. Clay pot-in-plastic basin\n3. Clay pot-in-clay dish\n4. Other\n5. I don’t use one",
"How would you rate the clay pot cooler you are using for vegetable storage?\n1. Very good\n2. Good\n3. Fair\n3. Fair\n4. Poor\n5. Very Poor",
"Have you shared your knowledge of clay pot cooler with other people?\n1. Yes\n2. No",
"This is the end of the survey. Thank you for participating. If you would like to give more feedback, please text this number when a survey is not in process."];
const inputPhoneNumbers=[["0013017608839"]];
const messagingApi = require("@cmdotcom/text-sdk");

// Get your product token at CM.com.
const yourProductToken = "8f2662a9-da4e-4d42-b736-478b51bf609c";
const myMessageApi = new messagingApi.MessageApiClient(yourProductToken);

//server
const express = require("express"); // backend framework for our node server.
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const Response=require("./models/Response");
const mongoose = require("mongoose");
//mongo connection
const mongoConnectionURL =
"mongodb+srv://ctang:whatShouldThisBe@cluster0.bavek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const databaseName = "UserFeedbackClayPotCoolers";
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName};
mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use(bodyParser.json())
app.use(express.json());
// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
//initial broadcast
for (let i = 0; i < inputPhoneNumbers.length; i++) {
 // const result = myMessageApi.sendTextMessage(inputPhoneNumbers[i], "MIT", questions[0]);

}
function convertNumberforSMS(phoneNum){
  return ["00"+phoneNum.substring(1)];
}

//record data to database
app.post("/hook", (req, res) => {
  const userphoneNum=req.body.from.number;
  Response.exists({ phoneNumber: userphoneNum }).then((phoneNumExist)=>{
    if(phoneNumExist){
      Response.findOne({phoneNumber:userphoneNum}).then((response)=>{
        if(response.content.length<questions.length){
          myMessageApi.sendTextMessage(convertNumberforSMS(userphoneNum), "MIT", questions[response.content.length])
        }
      response.content.push(req.body.message.text);
      response.save().then((result)=>{
        console.log(result); // Call your action on the request here
        res.sendStatus(200);
      });
    });
    }else{
      if(questions.length>1){
        myMessageApi.sendTextMessage(convertNumberforSMS(userphoneNum), "MIT", questions[1]);
      }
       const newResponse=new Response({
        time: req.body.timeUtc,
        phoneNumber:userphoneNum,
        content:[req.body.message.text]
    });
    newResponse.save().then(()=>{
      console.log(req.body); // Call your action on the request here
      res.sendStatus(200);
    });
  }
});

});