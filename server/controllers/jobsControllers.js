const Job = require("../../models/jobs");
const dateFormat = require("dateformat");
const mongoose = require("mongoose");

exports.jobs = async (req, res) => {
    Job.find()
      .exec()
      .then((joblist) => {
        res.render("pages/jobs", {
          user: req.session.user,
          title: "Jobs",
          layout: "./layouts/main",
          joblist: joblist,
        });
      })
      .catch((err) => {
        console.log("Error fetching job list:", err); // Add this line for debugging
        res.status(500).send("Server Error");
      });
  };

  exports.adminJobList = async (req, res) => {
    try {
      const joblist = await Job.find().exec();
      res.render("pages/adminJobList", {
        user: req.session.user,
        title: "Create Job",
        layout: "./layouts/main",
        joblist: joblist, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  exports.create_job = async (req, res) => {
    const error = req.query.error;
    res.render("pages/create_job", {
      user: req.session.user,
      title: "Create Job",
      error: error,
      layout: "./layouts/main",
    });
  };

  exports.editJob = async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;
  
    try {
      let jobData = await Job.findById(id); // Ensure the query is awaited
  
      if (jobData) {
        jobData.datepostedFmt = dateFormat(jobData.dateposted, "mm/dd/yyyy");
        jobData.deadlineFmt = dateFormat(jobData.deadline, "mm/dd/yyyy");
        res.render("pages/editJob", { title: "Edit Job", job: jobData, user });
      } else {
        console.log("Job not found");
        res.json({ success: false, error: "Job not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Error retrieving job" });
    }
  
  };


  exports.postEditJob = async (req, res) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid job ID" });
    }
  
    try {
      // Fetch the job data based on the ID from your database
      const jobData = await Job.findById(id); 
  
      if (jobData) {
        // Update the job's data based on the form submission
        jobData.JobTitle = req.body.JobTitle;
        jobData.classNumber = req.body.classNumber;
        jobData.jobType = req.body.jobType;
        jobData.scheduleType = req.body.scheduleType;
        jobData.location = req.body.location;
        jobData.description = req.body.description;
        jobData.payRate = req.body.payRate;
        jobData.education = req.body.education;
        jobData.experience = req.body.experience;
        jobData.skills = req.body.skills;
        jobData.dateposted = req.body.dateposted;
        jobData.deadline = req.body.deadline;
  
        // Save the updated data to the database
        await jobData.save();
  
        console.log("Job updated successfully");
        res.redirect("/adminJobList"); // Redirect to the admin page or another appropriate page
      } else {
        console.log("Job not found");
        res.json({ success: false, error: "Job not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Error updating job" });
    }
  };

  exports.postCreate_job = async (req, res) => {

    const job = new Job(req.body);
  
    job
      .save()
      .then((result) => {
        Job.find()
          .exec()
          .then((joblist) => {
            res.render("pages/jobs", {
              user: req.session.user,
              title: "Jobs",
              layout: "./layouts/main",
              joblist: joblist,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.postDeleteJob = async (req, res) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid job ID" });
    }
  
    try {
      const result = await Job.findByIdAndDelete(id);
  
      if (result) {
        console.log("Job deleted successfully");
        res.redirect("/adminJobList");
      } else {
        console.log("Job not found");
        res.json({ success: false, error: "Job not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Error deleting job" });
    }
  };