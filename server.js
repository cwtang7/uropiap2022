//basic version
//prints received webhooks to console, webhooks must be send to http://44.201.151.195:3000/hook
/*
Assume webhook is:{
  phoneNumber:
  content:
}
*/
const questions=["You participated in a clay pot cooler training. Have you been using a clay pot cooler? At any point in the survey, you can reply STOP to end the survey.\n 1. Yes\n 2. No",
"What type of clay pot cooler do you use?\n1. Clay pot-in-clay pot\n2. Clay pot-in-plastic basin\n3. Clay pot-in-clay dish\n4. Other\n5. I don’t use one",
"How would you rate the clay pot cooler you are using for vegetable storage?\n1. Very good\n2. Good\n3. Fair\n3. Fair\n4. Poor\n5. Very Poor",
"Have you shared your knowledge of clay pot cooler with other people?\n1. Yes\n2. No",
"This is the end of the survey. Thank you for participating. If you have any questions or would like to give more feedback, please text this number at any time whenever a survey is not in process"];
const inputPhoneNumbers=["0013017608839","0012404289963"];
/*const messagingApi = require("@cmdotcom/text-sdk");
const yourProductToken = "8f2662a9-da4e-4d42-b736-478b51bf609c";
const myMessageApi = new messagingApi.MessageApiClient(yourProductToken);*/

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
/*for (let i = 0; i < ;inputPhoneNumbers.length i++) {
  const result = myMessageApi.sendTextMessage(inputPhoneNumbers[i], "MIT", questions[0])
}*/







//record data to database
app.post("/hook", (req, res) => {
  const userphoneNum=req.body.phoneNumber;
  Response.exists({ phoneNumber: userphoneNum }).then((phoneNumExist)=>{
    if(phoneNumExist){
//const res = await Response.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
      Response.findOne({phoneNumber:userphoneNum}).then((response)=>{
      response.content.push(req.body.content);
   
      response.save().then((result)=>{
        console.log(result); // Call your action on the request here
        res.send(result);
      });
    });
    }else{
       const newResponse=new Response({
        phoneNumber:userphoneNum,
        content:[req.body.content]
    });
    newResponse.save().then((response)=>{
      console.log(req.body); // Call your action on the request here
      res.send(req.body);
    });
  }
});
});