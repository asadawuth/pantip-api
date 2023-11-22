module.exports = (req, res, next) => {
  //throw new Error("test error middleware");
  // app.use(notFoundMiddleware);
  res.status(404).json({ message: "resource not found on this server" });
};

// ไม่เจอก็ส่งเข้าไปที่ช่อง404
