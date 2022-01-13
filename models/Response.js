const mongoose=require("mongoose");
const responseSchema=new mongoose.Schema({
    time:String, //first message received
    phoneNumber: String,
    content:[String],

})


module.exports = mongoose.model("response", responseSchema);