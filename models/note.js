const mongoose = require("mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema(
    {
        Name: { type: String, required: [true, 'Name is required'], minlength: [4, "Name must be 4 chars long"] },
        Surname: String,
        Address: String,
        Email: String,
        Comment: String,


    },
    {timestamps: true}
);

module.exports = mongoose.model("Note", noteSchema)