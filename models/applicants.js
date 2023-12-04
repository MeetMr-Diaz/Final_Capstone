const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    fName: String,
    surname: String,
    studentID: String,
    email: String,
    level: String,
    graduatingSemester: String,
    GPA: Number,
    hours: Number,
    degree: String,
    major: String,
    applyingFor: String,
    GTA: String,
    courses: String,
    userId: String,
    status: String,
  });
  
  const applicant = mongoose.model("applicant", applicantSchema);

  module.exports = applicant;