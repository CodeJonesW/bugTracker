const { Schema, ObjectId } = require("mongoose");
const db = require("../config/connection");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `bugsReported` array in User.js
const bugSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  _id: {
    type: ObjectId,
    required: true,
  },
});

module.exports = bugSchema;
