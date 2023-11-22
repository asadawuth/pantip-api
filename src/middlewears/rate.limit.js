const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  message: { message: "Too many request from this IP" },
});

//ถ้ายิงเกิน100ครั้ง ในเวลาที่กำหนดจะ Error
