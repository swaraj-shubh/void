import cloudinary from "../cloudinary/cloudinaryConfig.js";
import Submission from "../models/Submission.js";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export const uploadFields = upload.fields([
  { name: "studentAnswerSheet", maxCount: 1 },
  { name: "questionPaper", maxCount: 1 },
  { name: "answerKey", maxCount: 1 },
]);

// Upload controller
export const uploadSubmission = async (req, res) => {
  try {
    const { examName } = req.body;
    const files = req.files;

    if (!examName) {
      return res.status(400).json({ message: "Exam name is required" });
    }

    // Upload each file to Cloudinary
    const studentPdf = await cloudinary.uploader.upload(
      files.studentAnswerSheet[0].path,
      { resource_type: "raw", folder: "submissions" }
    );
    const questionImg = await cloudinary.uploader.upload(
      files.questionPaper[0].path,
      { resource_type: "image", folder: "submissions" }
    );
    const answerImg = await cloudinary.uploader.upload(
      files.answerKey[0].path,
      { resource_type: "image", folder: "submissions" }
    );

    // Save in MongoDB
    const submission = new Submission({
      examName,
      studentAnswerSheet: studentPdf.secure_url,
      questionPaper: questionImg.secure_url,
      answerKey: answerImg.secure_url,
    });

    await submission.save();

    // Delete local temp files
    Object.values(files).flat().forEach((file) => fs.unlinkSync(file.path));

    res.status(200).json({
      message: "Submission uploaded successfully",
      submission,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

// Get all submissions
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ uploadedAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};
