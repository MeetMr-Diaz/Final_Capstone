const Job = require("../../models/jobs");
const applicant = require("../../models/applicants");
const mongoose = require("mongoose");
const db = require("../config/db");
const dateFormat = require("dateformat");

function isAdminUser(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") {
    // Redirect to the login page if not authenticated
    return false;
  }

  return true;
}

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    // Redirect to the login page if not authenticated
    return false;
  }
  return true;
}
/*GET /
 */

exports.homepage = async (req, res) => {
  try {
    let joblist;

    if (req.body.title) {
      // Perform a case-insensitive search for the job title in the database
      joblist = await Job.find({
        JobTitle: { $regex: req.body.title, $options: "i" },
      }).exec();
      joblist = await Job.find({
        classNumber: { $regex: req.body.title, $options: "i" },
      }).exec();
      joblist = await Job.find({
        jobType: { $regex: req.body.title, $options: "i" },
      }).exec();
    } else {
      // If the form is not submitted or empty, fetch all jobs
      joblist = await Job.find().exec();
    }

    res.render("pages/index", {
      user: req.session.user,
      title: "Home",
      layout: "./layouts/main",
      joblist: joblist, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// login route
exports.login = async (req, res) => {
  const error = req.query.error;
  res.render("pages/login", {
    user: req.session.user,
    title: "Login",
    error: error,
    layout: "./layouts/main",
  });
};

// contact route
exports.contact = async (req, res) => {
  res.render("pages/contact", {
    user: req.session.user,
    title: "Contact",
    layout: "./layouts/main",
  });
};

// contact route
exports.signup = async (req, res) => {
  res.render("pages/signup", {
    user: req.session.user,
    title: "Sign Up",
    layout: "./layouts/main",
  });
};

// apply route
exports.apply = async (req, res) => {
  if (!isLoggedIn(req, res)) {
    res.redirect("/login");
  } else {
    res.render("pages/apply", {
      user: req.session.user,
      title: "Apply",
      layout: "./layouts/main",
    });
  }
};

// view_job route
exports.admin = async (req, res) => {
  if (!isAdminUser(req, res)) {
    res.redirect("/login");
  } else {
    const applicantList = await applicant.find().exec();
    res.render("pages/admin", {
      fName: req.session.fName,
      surname: req.session.surname,
      studentID: req.session.studentID,
      email: req.session.email,
      level: req.session.level,
      graduatingSemester: req.session.graduatingSemester,
      GPA: req.session.GPA,
      hours: req.session.hours,
      degree: req.session.degree,
      major: req.session.major,
      applyingFor: req.session.applyingFor,
      GTA: req.session.GTA,
      courses: req.session.courses,
      user: req.session.user,
      title: "Admin",
      layout: "./layouts/main",
      applicantList, // Pass the joblist data to the 'adminJobList' 
    });
  }
};

// logout route
exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
  console.log("Logout successful");
};

// editApplicant route
exports.editApplicant = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid applicant ID" });
  }

  try {
    // Fetch the applicant data based on the ID from your database
    const applicantData = await applicant.findById(id);

    if (applicantData) {
      const user = req.session.user;
      // Render the "editApplicant" form with the applicant's data pre-populated
      res.render("pages/editApplicant", {
        title: "Edit Applicant",
        user,
        applicantData,
      });
    } else {
      console.log("Applicant not found");
      res.json({ success: false, error: "Applicant not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "Error retrieving applicant" });
  }
};

exports.studentApp = async (req, res) => {
  try {
    const applicants = await applicant.find({
      userId: req.session.user.userId,
    });
    if (applicant) {
      res.render("pages/studentApp", {
        title: "Student Application",
        user: req.session.user,
        title: "applicant Information",
        layout: "./layouts/main",
        applicants: applicants,
      });
    } else {
      console.log("Applicant not found");
      res.json({ success: false, error: "Applicant not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "Error retrieving applicant" });
  }
};

//////////////////////  POST /////////////////////////////////////////

exports.postUpdateStatus = async (req, res) => {
  const { status } = req.body;
  const applicantId = req.params.applicant_id;

  console.log(req.body);

  try {
    const foundApplicant = await applicant.findById(applicantId);

    if (!foundApplicant) {
      return res
        .status(404)
        .json({ success: false, error: "Applicant not found" });
    }

    foundApplicant.status = status;
    const updatedApplicant = await foundApplicant.save();

    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.postStudentApp = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid job ID" });
  }

  try {
    // Fetch the applicant data based on the ID from your database
    const applicantData = await applicant.findById(id);

    if (applicantData) {
      applicantData.fName = req.body.fName;
      applicantData.surname = req.body.surname;
      applicantData.studentID = req.body.studentID;
      applicantData.email = req.body.email;
      applicantData.level = req.body.level;
      applicantData.graduatingSemester = req.body.graduatingSemester;
      applicantData.GPA = req.body.GPA;
      applicantData.hours = req.body.hours;
      applicantData.degree = req.body.degree;
      applicantData.major = req.body.major;
      applicantData.applyingFor = req.body.applyingFor;
      applicantData.courses = req.body.courses;
      // Save the updated data to the database
      await applicantData.save();

      console.log("Applicant updated successfully");
      res.redirect("/index");
    } else {
      console.log("Applicant not found");
      res.json({ success: false, error: "Applicant not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Error fecthing job" });
  }
};

exports.postLogin = async (req, res) => {
  try {
    // Get data from the login page
    const email = req.body.email;
    const password = req.body.password;

    const userCollection = db.collection("users");
    userCollection.findOne({ email: email }, (err, user) => {
      if (err) {
        throw err;
      }

      if (user === null) {
        return res.redirect("/login?error=Invalid email or password");
      }

      if (user.password === password) {
        // Corrected comparison
        console.log("Login successful");

        req.session.user = {
          role: user.role,
          userId: user._id,
        };

        if (req.session.user.role === "admin") {
          return res.redirect("admin");
        } else {
          return res.redirect("jobs");
        }
      } else {
        console.log("Wrong password");
        return res.redirect("/login?error=Invalid email or password");
      }
    });
  } catch (err) {
    console.log("Error:", err);
    return res.redirect("/login?error=An error occurred");
  }
};

exports.postEditApplicant = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid applicant ID" });
  }

  try {
    // Fetch the applicant data based on the ID from your database
    const applicantData = await applicant.findById(id);

    if (applicantData) {
      // Update the applicant's data based on the form submission
      applicantData.fName = req.body.fName;
      applicantData.surname = req.body.surname;
      applicantData.studentID = req.body.studentID;
      applicantData.email = req.body.email;
      applicantData.level = req.body.level;
      applicantData.graduatingSemester = req.body.graduatingSemester;
      applicantData.GPA = req.body.GPA;
      applicantData.hours = req.body.hours;
      applicantData.degree = req.body.degree;
      applicantData.major = req.body.major;
      applicantData.applyingFor = req.body.applyingFor;
      applicantData.GTA = req.body.GTA;
      applicantData.courses = req.body.courses;

      // Save the updated data to the database
      await applicantData.save();

      console.log("Applicant updated successfully");
      if (req.session.user.role === "admin") {
        return res.redirect("/admin");
      } else {
      res.redirect("/studentApp"); // Redirect to the admin page or another appropriate page
    }
  }} catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Error updating applicant" });
  }
};

exports.postSignup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const data = {
    role: "student",
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record inserted successfully");
  });

  return res.redirect("login");
};

exports.postApply = async (req, res) => {
  const data = {
    fName: req.body.fName,
    surname: req.body.surname,
    studentID: req.body.studentID,
    email: req.body.email,
    level: req.body.level,
    graduatingSemester: req.body.graduatingSemester,
    GPA: req.body.GPA,
    degree: req.body.degree,
    major: req.body.major,
    applyingFor: req.body.applyingFor,
    GTA: req.body.GTA,
    courses: req.body.courses,
    hours: req.body.hours,
    userId: req.session.user.userId,
    status: 'Application Submitted',
  };


  const existingApplicant = await applicant.findOne({ email: req.body.email });

 
    // Email is unique and matches session, proceed to insert into the database
    db.collection("applicants").insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Record inserted successfully");
    });

    return res.redirect("jobs");
  
};

exports.postDeleteApplicant = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid applicant ID" });
  }

  try {
    const result = await applicant.findByIdAndDelete(id);

    if (result) {
      console.log("Applicant deleted successfully");
      // Redirect to the admin page or wherever you want after deleting the applicant
      res.redirect("/admin");
    } else {
      console.log("Applicant not found");
      res.json({ success: false, error: "Applicant not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Error deleting applicant" });
  }
};

exports.postSearch = async (req, res) => {
  try {
    let joblist;

    // Check if the form was submitted and contains the 'title' field
    if (req.body.title) {
      const searchQuery = req.body.title;
      // Perform a case-insensitive search for multiple fields in the database
      joblist = await Job.find({
        $or: [
          { JobTitle: { $regex: searchQuery, $options: "i" } },
          { classNumber: { $regex: searchQuery, $options: "i" } },
          { jobType: { $regex: searchQuery, $options: "i" } },
          { education: { $regex: searchQuery, $options: "i" } },
          // Add more fields here for which you want to search
        ],
      }).exec();
    } else {
      // If the form is not submitted or empty, fetch all jobs
      joblist = await Job.find().exec();
    }

    res.render("pages/index", {
      user: req.session.user,
      title: "Home",
      layout: "./layouts/main",
      joblist: joblist, // Pass the filtered joblist data to the 'index' template
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
