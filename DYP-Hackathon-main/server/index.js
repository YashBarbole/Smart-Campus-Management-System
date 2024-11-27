import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; // Correct import
import bcrypt from "bcryptjs";
import session from "express-session";

dotenv.config();

const app = express();
app.use(express.json()); // To handle JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

const uri = process.env.MONGO_URI; // Use environment variable for MongoDB URI

// Setup express-session with 1 day expiry (24 hours)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Use an environment variable for session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expires in 1 day
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection and Passport configuration
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    const usersCollection = client.db("Test").collection("users");
    const adminCollection = client.db("CollegeAdmin").collection("admins");
    const noticeCollection = client.db("CollegeAdmin").collection("notices");
    const teacherCollection = client.db("teacher").collection("teachers");
    const clubCollection = client.db("club").collection("clubs");
    const studentCollection = client.db("student").collection("students");
    const eventsCollection = client.db("club").collection("events");
    const clubDetailsCollection = client.db("club").collection("details");
    const attendanceCollection = client.db("student").collection("attendance");


    const timetableCollection = client
      .db("TimetableDB")
      .collection("timetable");

    // Passport Local Strategy for Student
    passport.use(
      "student-local",
      new LocalStrategy(
        { usernameField: "studentID" },
        async (studentID, password, done) => {
          try {
            const student = await studentCollection.findOne({ studentID });
            if (!student) {
              console.log("Student not found");
              return done(null, false, { message: "Incorrect student ID." });
            }

            // Compare the password using bcrypt
            const isValidStudentPassword = await bcrypt.compare(
              password,
              student.password
            );

            if (!isValidStudentPassword) {
              console.log("Student password does not match");
              return done(null, false, { message: "Incorrect password." });
            }

            console.log("Student login successful");
            return done(null, student);
          } catch (error) {
            console.error("Error during student login:", error);
            return done(error);
          }
        }
      )
    );

    // Passport Local Strategy for User
    passport.use(
      "user-local",
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            const user = await usersCollection.findOne({ email });
            if (!user) {
              console.log("User not found");
              return done(null, false, { message: "Incorrect email." });
            }

            // Compare the password using bcrypt
            const isValidPassword = await bcrypt.compare(
              password,
              user.password
            );

            if (!isValidPassword) {
              console.log("Password does not match");
              return done(null, false, { message: "Incorrect password." });
            }

            console.log("User login successful");
            return done(null, user);
          } catch (error) {
            console.error("Error during user login:", error);
            return done(error);
          }
        }
      )
    );

    // Passport Local Strategy for Admin
    passport.use(
      "admin-local",
      new LocalStrategy(
        { usernameField: "adminID" },
        async (adminID, password, done) => {
          try {
            const admin = await adminCollection.findOne({ adminID });
            if (!admin) {
              console.log("Admin not found");
              return done(null, false, { message: "Incorrect admin ID." });
            }

            // Compare the password using bcrypt
            const isValidAdminPassword = await bcrypt.compare(
              password,
              admin.password
            );

            if (!isValidAdminPassword) {
              console.log("Admin password does not match");
              return done(null, false, { message: "Incorrect password." });
            }

            console.log("Admin login successful");
            return done(null, admin);
          } catch (error) {
            console.error("Error during admin login:", error);
            return done(error);
          }
        }
      )
    );

    // Passport Local Strategy for Teacher
    passport.use(
      "teacher-local",
      new LocalStrategy(
        { usernameField: "teacherID" },
        async (teacherID, password, done) => {
          try {
            const teacher = await teacherCollection.findOne({ teacherID });
            if (!teacher) {
              console.log("Teacher not found");
              return done(null, false, { message: "Incorrect teacher ID." });
            }

            // Compare the password using bcrypt
            const isValidTeacherPassword = await bcrypt.compare(
              password,
              teacher.password
            );

            if (!isValidTeacherPassword) {
              console.log("Teacher password does not match");
              return done(null, false, { message: "Incorrect password." });
            }

            console.log("Teacher login successful");
            return done(null, teacher);
          } catch (error) {
            console.error("Error during teacher login:", error);
            return done(error);
          }
        }
      )
    );

    // Passport Local Strategy for Club
    passport.use(
      "club-local",
      new LocalStrategy(
        { usernameField: "clubID" },
        async (clubID, password, done) => {
          try {
            const club = await clubCollection.findOne({ clubID });
            if (!club) {
              console.log("Club not found");
              return done(null, false, { message: "Incorrect club ID." });
            }

            // Compare the password using bcrypt
            const isValidClubPassword = await bcrypt.compare(
              password,
              club.password
            );

            if (!isValidClubPassword) {
              console.log("Club password does not match");
              return done(null, false, { message: "Incorrect password." });
            }

            console.log("Club login successful");
            return done(null, club);
          } catch (error) {
            console.error("Error during club login:", error);
            return done(error);
          }
        }
      )
    );

    app.post("/clubdetails", async (req, res) => {
      const {
        clubID,
        clubName,
        clubDescription,
        foundingDate,
        facultyAdvisor,
        contactEmail,
        contactPhoneNo,
        clubMembersNo,
      } = req.body;

      // Ensure all fields are provided
      if (
        !clubID ||
        !clubName ||
        !clubDescription ||
        !foundingDate ||
        !facultyAdvisor ||
        !contactEmail ||
        !contactPhoneNo ||
        !clubMembersNo
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Insert new event into the "events" collection
        const result = await clubDetailsCollection.insertOne({
          clubID,
          clubName,
          clubDescription,
          foundingDate,
          facultyAdvisor,
          contactEmail,
          contactPhoneNo,
          clubMembersNo,
          createdAt: new Date(), // Optional: track when the event was created
        });

        res.status(201).json({
          message: "Details created successfully",
          eventId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding details:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Event creation route
    app.post("/events", async (req, res) => {
      const {
        clubID,
        clubName,
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventVenue,
      } = req.body;

      // Ensure all fields are provided
      if (
        !clubID ||
        !clubName ||
        !eventName ||
        !eventDescription ||
        !eventDate ||
        !eventTime ||
        !eventVenue
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Insert new event into the "events" collection
        const result = await eventsCollection.insertOne({
          clubID,
          clubName,
          eventName,
          eventDescription,
          eventDate,
          eventTime,
          eventVenue,
          createdAt: new Date(), // Optional: track when the event was created
        });

        res.status(201).json({
          message: "Event created successfully",
          eventId: result.insertedId,
        });
      } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/clubdetails", async (req, res) => {
      const {
        clubID,
        clubName,
        clubDescription,
        foundingDate,
        facultyAdvisor,
        contactEmail,
        contactPhoneNo,
        clubMembersNo,
      } = req.body;

      // Ensure all fields are provided
      if (
        !clubID ||
        !clubName ||
        !clubDescription ||
        !foundingDate ||
        !facultyAdvisor ||
        !contactEmail ||
        !contactPhoneNo ||
        !clubMembersNo
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Insert new event into the "events" collection
        const result = await clubDetailsCollection.insertOne({
          clubID,
          clubName,
          clubDescription,
          foundingDate,
          facultyAdvisor,
          contactEmail,
          contactPhoneNo,
          clubMembersNo,
          createdAt: new Date(), // Optional: track when the event was created
        });

        res.status(201).json({
          message: "Details created successfully",
          eventId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding details:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Event creation route
    app.post("/notice", async (req, res) => {
      const { subject, noticeDescription, noticeDate } = req.body;

      // Ensure all fields are provided
      if (!subject || !noticeDescription || !noticeDate) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Insert new event into the "events" collection
        const result = await noticeCollection.insertOne({
          subject,
          noticeDescription,
          noticeDate,
          createdAt: new Date(), // Optional: track when the event was created
        });

        res.status(201).json({
          message: "Notice created successfully",
          eventId: result.insertedId,
        });
      } catch (error) {
        console.error("Error creating notice:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/events", async (req, res) => {
      try {
        const events = await eventsCollection.find({}).toArray();
        res.status(200).json(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    app.get("/notice", async (req, res) => {
      try {
        const notices = await noticeCollection.find({}).toArray(); // Corrected to notices
        res.status(200).json(notices); // Sending the correct variable
      } catch (error) {
        console.error("Error fetching notices:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Serialize and deserialize user for session support
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        if (user) return done(null, user);

        const admin = await adminCollection.findOne({ _id: new ObjectId(id) });
        if (admin) return done(null, admin);

        const teacher = await teacherCollection.findOne({
          _id: new ObjectId(id),
        });
        if (teacher) return done(null, teacher);

        const club = await clubCollection.findOne({ _id: new ObjectId(id) });
        done(null, club);
      } catch (error) {
        done(error);
      }
    });

    // Register user route
    app.post("/registerdb", async (req, res) => {
      const { name, email, password } = req.body;

      // Ensure all fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the "users" collection
        const result = await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
        });
        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Register student route
    app.post("/studentregisterdb", async (req, res) => {
      const { studentName, studentID, password } = req.body;

      // Ensure all fields are provided
      if (!studentName || !studentID || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Check if the student already exists
        const existingStudent = await studentCollection.findOne({ studentID }); // Fixed collection reference
        if (existingStudent) {
          return res.status(400).json({ error: "Student already exists" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new student into the "students" collection
        const result = await studentCollection.insertOne({
          studentName,
          studentID,
          password: hashedPassword,
        });
        res.status(201).json({
          message: "Student registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Register teacher route
    app.post("/teacherregisterdb", async (req, res) => {
      const { teacherName, teacherID, password } = req.body;

      // Ensure all fields are provided
      if (!teacherName || !teacherID || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Check if the teacher already exists
        const existingTeacher = await teacherCollection.findOne({ teacherID });
        if (existingTeacher) {
          return res.status(400).json({ error: "Teacher already exists" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new teacher into the "teachers" collection
        const result = await teacherCollection.insertOne({
          teacherName,
          teacherID,
          password: hashedPassword,
        });
        res.status(201).json({
          message: "Teacher registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering teacher:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Register club route
    app.post("/clubregisterdb", async (req, res) => {
      const { clubName, clubID, password } = req.body;

      // Ensure all fields are provided
      if (!clubName || !clubID || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Check if the club already exists
        const existingClub = await clubCollection.findOne({ clubID }); // Fixed collection reference
        if (existingClub) {
          return res.status(400).json({ error: "Club already exists" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new club into the "clubs" collection
        const result = await clubCollection.insertOne({
          clubName,
          clubID,
          password: hashedPassword,
        });
        res.status(201).json({
          message: "Club registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering club:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // User login route
    app.post("/logindb", (req, res, next) => {
      passport.authenticate("user-local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: info.message });

        req.login(user, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Logged in successfully",
            user: {
              email: req.user.email,
              name: req.user.name,
            },
          });
        });
      })(req, res, next);
    });

    // Student login route
    app.post("/studentlogindb", (req, res, next) => {
      passport.authenticate("student-local", (err, student, info) => {
        if (err) return next(err);
        if (!student) return res.status(400).json({ error: info.message });

        req.login(student, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Student logged in successfully",
            student: {
              studentID: req.user.studentID,
            },
          });
        });
      })(req, res, next);
    });

    // Admin login route
    app.post("/adminlogindb", (req, res, next) => {
      passport.authenticate("admin-local", (err, admin, info) => {
        if (err) return next(err);
        if (!admin) return res.status(400).json({ error: info.message });

        req.login(admin, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Admin logged in successfully",
            admin: {
              adminID: req.user.adminID,
            },
          });
        });
      })(req, res, next);
    });

    // Teacher login route
    app.post("/teacherlogindb", (req, res, next) => {
      passport.authenticate("teacher-local", (err, teacher, info) => {
        if (err) return next(err);
        if (!teacher) return res.status(400).json({ error: info.message });

        req.login(teacher, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Teacher logged in successfully",
            teacher: {
              teacherID: req.user.teacherID,
            },
          });
        });
      })(req, res, next);
    });

    // Club login route
    app.post("/clublogindb", (req, res, next) => {
      passport.authenticate("club-local", (err, club, info) => {
        if (err) return next(err);
        if (!club) return res.status(400).json({ error: info.message });

        req.login(club, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Club logged in successfully",
            club: {
              clubID: req.user.clubID,
            },
          });
        });
      })(req, res, next);
    });

    app.post("/timetable", async (req, res) => {
      const {
        class: className,
        division,
        batch,
        subject,
        teacherId,
        teacherName,
        roomNumber,
        day,
        startTime,
        endTime,
        classCancelledByTeacher,
        adminId,
      } = req.body;

      // Ensure all fields are provided
      if (
        !className ||
        !division ||
        !batch ||
        !subject ||
        !teacherId ||
        !teacherName ||
        !roomNumber ||
        !day ||
        !startTime ||
        !endTime
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      try {
        const result = await timetableCollection.insertOne({
          class: className,
          division,
          batch,
          subject,
          teacherId,
          teacherName,
          roomNumber,
          day,
          startTime,
          endTime,
          classCancelledByTeacher,
          adminId,
          createdAt,
          updatedAt,
        });
        res.status(201).json({
          message: "Timetable entry created successfully",
          timetableId: result.insertedId,
        });
      } catch (error) {
        console.error("Error creating timetable:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // GET endpoint to fetch all timetable entries
    app.get("/timetable", async (req, res) => {
      try {
        const entries = await timetableCollection.find({}).toArray();
        res.status(200).json(entries);
      } catch (error) {
        console.error("Error fetching timetable entries:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // GET endpoint to fetch all teachers
    app.get("/teachers", async (req, res) => {
      try {
        const teachers = await teacherCollection.find({}).toArray(); // Fetch all teachers from the database
        res.status(200).json(teachers); // Return the teachers as JSON
      } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors
      }
    });

    async function cancelClassById(id) {
      console.log("Cancelling class with ID:", id); // Log the ID
      const result = await timetableCollection.updateOne(
        { _id: new ObjectId(id) }, // Use ObjectId here
        { $set: { classCancelledByTeacher: true } }
      );
      console.log("Cancellation result:", result); // Log the result
      return result.modifiedCount > 0; // Return true if a document was modified
    }

    // PATCH endpoint to cancel a class
    app.patch("/timetable/:id/cancel", async (req, res) => {
      const timetableId = req.params.id;

      try {
        const result = await cancelClassById(timetableId);
        if (result) {
          return res
            .status(200)
            .json({ message: "Class cancelled successfully." });
        } else {
          return res.status(404).json({ error: "Class not found." });
        }
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "An error occurred while cancelling the class." });
      }
    });

    app.post('/attendance', async (req, res) => {
          const {
              name,
              code,
              time,
              location,
          } = req.body;
      
          // Ensure all fields are provided
          if (!name || !code || !time || !location) {
              return res.status(400).json({ error: 'All fields are required' });
          }
      
          const createdAt = new Date().toISOString();
          const updatedAt = createdAt;
      
          try {
              const result = await attendanceCollection.insertOne({
                  name,
                  code,
                  time,
                  location,
                  createdAt,
                  updatedAt,
              });
              res.status(201).json({
                  message: 'Attendance entry created successfully',
                  attendanceId: result.insertedId,
              });
          } catch (error) {
              console.error('Error creating attendance:', error);
              res.status(500).json({ error: 'Internal Server Error' });
          }
      });
      app.get('/api/gattendance', async (req, res) => {
        try {
            // Fetch attendance records from the database
            const attendanceRecords = await attendanceCollection.find().toArray();
            
            // Send the attendance records back as a JSON response
            res.status(200).json(attendanceRecords);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    


    // Logout route
    app.post("/logout", (req, res) => {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
      });
    });
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

// Start the server and connect to MongoDB
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await main(); // Call the main function to connect to MongoDB
});
