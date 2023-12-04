const mongoose = require("mongoose");

// Define the Job schema
const jobSchema = new mongoose.Schema({
  JobTitle: String,
  classNumber: String,
  jobType: String,
  scheduleType: String,
  location: String,
  description: String,
  payRate: String,
  education: String,
  experience: String,
  skills: String,
  dateposted: Date,
  deadline: Date,
});

// Create and export the Job model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;