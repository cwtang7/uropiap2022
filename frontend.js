const messagingApi = require("@cmdotcom/text-sdk");

// Get your product token at CM.com.
const yourProductToken = "8f2662a9-da4e-4d42-b736-478b51bf609c";
const myMessageApi = new messagingApi.MessageApiClient(yourProductToken);

//let  result = myMessageApi.sendTextMessage(["0013017608839"], "MIT", "Hello! pls lmk if you received this\n Thx! \nChristine");
let  result = myMessageApi.sendTextMessage(["0013017608839"], "MIT", "What type of clay pot cooler do you use?\n1. Clay pot-in-clay pot\n2. Clay pot-in-plastic basin\n3. Clay pot-in-clay dish\n4. Other\n5. I don’t use one");
result.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});