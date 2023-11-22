// สร้างหัวกระทู้ได้ ลบหัวกระทู้ได้ แก้ไขหัวกระทู้และคอมเม้นในหัวกระทู้ วันเวลาที่โพส
// const fs = require("fs/promises");
// const createError = require("../utils/create-error");
// const { upload } = require("../utils/cloudinary-s");
const prisma = require("../../models/prisma");

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await prisma.post.findMany({});

  res.json({ blogs });
};

exports.createBlog = async (req, res, next) => {
  const { title, contentString } = req.body;

  console.log(title);

  await prisma.post.create({
    data: { title, contentString, userId: req.user.id },
  });

  res.json({ message: "Created post success" });
};

exports.deleteBlog = async (req, res, next) => {
  console.log(req.params.id);
  await prisma.post.deleteMany({
    where: {
      id: +req.params.blogId,
    },
  });
  res.status(200).json({ msg: "delete complete" });
};

exports.editBlog = async (req, res, next) => {
  console.log(req.body);
  await prisma.post.update({
    where: {
      id: +req.params.blogId,
    },
    data: {
      title: req.body.title,
    },
  });
  res.status(200).json({ msg: "edit Finished" });
};
