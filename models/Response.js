const mongoose=require("mongoose");
const responseSchema=new mongoose.Schema({
    phoneNumber: String,
    //content:[String]
    type: {content:[String],
        default: []}
})


module.exports = mongoose.model("response", responseSchema);