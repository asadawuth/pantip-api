const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../validators/auth-validators");
const prisma = require("../model/prisma");
const { required } = require("joi");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    } // ถ้าError เข้าไปที่หน้า app.js  19.app.use("/auth", authRoute);
    value.password = await bcrypt.hash(value.password, 12);
    console.log(value);
    const user = await prisma.user.create({
      // เข้าพาสที่ถูก hash แล้วเก็บลง Database
      data: value,
    });
    console.log(user);
    const payload = { userId: user.id }; //เซพเวอร์จนจำ ไอดี
    const accessToken = jwt.sign(
      //สร้างกุญแจสำหรับหน้าบ้าน
      payload,
      process.env.JWT_SECRET_KEY || "qwertyuiop",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    console.log(accessToken);
    res.status(201).json({ accessToken }); //ส่งกุญแจกลับไปให้หน้าบ้าน
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    console.log(username);
    console.log(password);
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (!user) {
      return next(new Error("can not login1"));
    }

    const isMatch = await bcrypt.compare(password, user.password); //เทียบพาสที่user Res กับ pass ที่ User กรอกใหม่ตอน Login ในรูปของ bcrypt
    if (!isMatch) {
      return next(new Error("can not login2"));
    }

    const payload = { userId: user.id }; //ถ้าเปรียบแล้วเหือนกัน สร้างกุญแจ
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "qazwsxedc", //สร้างกุญแจ มี พาส ในการใช้กุญแจ
      {
        expiresIn: process.env.JWT_EXPIRE, //ระยะเวลาล็อคอินค้างไว้ ของหน้าบ้าน
      }
    );

    delete user.password;
    res.status(200).json({ accessToken, user }); //มีการขอ จังหวะ1 จังหวะ 2 มีการส่งกลับไป
  } catch (err) {
    next(err);
  }
};

exports.getme = (req, res, next) => {
  res.status(201).json({ user: req.user });
};
