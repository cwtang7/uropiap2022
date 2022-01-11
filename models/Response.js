const mongoose=require("mongoose");
const responseSchema=new mongoose.Schema({
    phoneNumber: String,
    //content:[String]
 content:[String]
})


module.exports = mongoose.model("response", responseSchema);