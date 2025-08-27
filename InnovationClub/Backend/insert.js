const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Credentials = require("./src/models/model");

const URI =
  "mongodb+srv://theshahidprofessional:1lD5nVDQkyhgfbuE@manadheidantaah.zkyuf0q.mongodb.net/?retryWrites=true&w=majority&appName=ManadheIdantaah";

const insertMockCredentials = async () => {
  try {
    const mockUsers = [
      { email: "student1@gmail.com", password: await bcrypt.hash("studentpass1", 10), role: "student" },
      { email: "student2@gmail.com", password: await bcrypt.hash("studentpass2", 10), role: "student" },
      { email: "faculty1@gmail.com", password: await bcrypt.hash("facultypass1", 10), role: "faculty" },
      { email: "faculty2@gmail.com", password: await bcrypt.hash("facultypass2", 10), role: "faculty" },
      { email: "admin@gmail.com", password: await bcrypt.hash("adminpass", 10), role: "admin" },
    ];

    console.log("Inserting mock credentials...");
    await Credentials.insertMany(mockUsers);
    console.log("✅ Mock credentials inserted successfully ✅");
  } catch (error) {
    console.error("❌ Error inserting mock credentials:", error);
  } finally {
    mongoose.disconnect();
  }
};

mongoose
  .connect(URI, { dbName: "InnovationClub" })
  .then(() => {
    console.log("✅ Connected to MongoDB ✅");
    return insertMockCredentials();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
