const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const cors = require("cors");

const db = require("./models");
const User = db.User;
const Attendance = db.Attendance;
const Leave = db.Leave;
const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "SECRET_KEY";

//leaves

// 📝 APPLY LEAVE
app.post("/leave", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate, type, reason } = req.body;

    const leave = await Leave.create({
      userId,
      startDate,
      endDate,
      type,
      reason,
      status: "Pending",
    });

    res.json({
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📄 GET LEAVES
app.get("/leave", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const leaves = await Leave.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔐 AUTH MIDDLEWARE
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


// 📝 REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔑 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📍 CHECK-IN
app.post("/checkin", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      where: {
        userId,
        checkIn: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    const record = await Attendance.create({
      userId,
      checkIn: new Date(),
    });

    res.json({
      message: "Check-in successful",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📍 CHECK-OUT
app.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({
      where: {
        userId,
        checkIn: {
          [Op.gte]: startOfDay,
        },
      },
    });

    if (!record) {
      return res.status(400).json({
        message: "Please check-in first",
      });
    }

    if (record.checkOut) {
      return res.status(400).json({
        message: "Already checked out",
      });
    }

    record.checkOut = new Date();
    await record.save();

    res.json({
      message: "Check-out successful",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📊 TIMESHEET
app.get("/timesheet", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const records = await Attendance.findAll({
      where: { userId },
      order: [["checkIn", "DESC"]],
    });

    const result = records.map((record) => {
      let totalHours = null;

      if (record.checkIn && record.checkOut) {
        totalHours =
          (new Date(record.checkOut) - new Date(record.checkIn)) /
          (1000 * 60 * 60);
      }

      return {
        date: record.checkIn,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        totalHours: totalHours ? totalHours.toFixed(2) : null,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});