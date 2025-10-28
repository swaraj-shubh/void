import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image as ImgIcon, Key, Download, Eye } from "lucide-react";

const Teacher = ({ examName }) => {
  const [studentAnswerSheet, setStudentAnswerSheet] = useState(null);
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Upload handler
  const handleUpload = async () => {
    if (!studentAnswerSheet || !questionPaper || !answerKey) {
      alert("Please upload all three files!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("examName", examName);
    formData.append("studentAnswerSheet", studentAnswerSheet);
    formData.append("questionPaper", questionPaper);
    formData.append("answerKey", answerKey);

    try {
      await axios.post("http://localhost:5000/api/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Uploaded successfully!");
      setStudentAnswerSheet(null);
      setQuestionPaper(null);
      setAnswerKey(null);
      fetchSubmissions();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ Fetch all submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filter submissions for the current exam
  const currentExamSubmissions = submissions.filter(sub => sub.examName === examName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* ======================= Upload & Submissions Section ======================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Upload Files
                </CardTitle>
                <p className="text-gray-600">
                  Upload all required documents for evaluation
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Student Answer Sheet */}
                <UploadBox
                  id="answerSheet"
                  label="Student Answer Sheet (PDF)"
                  icon={<FileText className="w-4 h-4 text-green-600" />}
                  file={studentAnswerSheet}
                  accept=".pdf"
                  onChange={(f) => setStudentAnswerSheet(f)}
                />

                {/* Question Paper */}
                <UploadBox
                  id="questionPaper"
                  label="Question Paper (Image)"
                  icon={<ImgIcon className="w-4 h-4 text-green-600" />}
                  file={questionPaper}
                  accept="image/*"
                  onChange={(f) => setQuestionPaper(f)}
                />

                {/* Answer Key */}
                <UploadBox
                  id="answerKey"
                  label="Answer Key (Image)"
                  icon={<Key className="w-4 h-4 text-green-600" />}
                  file={answerKey}
                  accept="image/*"
                  onChange={(f) => setAnswerKey(f)}
                />

                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full rounded-full py-6 text-lg bg-green-700 hover:bg-green-800 shadow-lg transition-all duration-300"
                >
                  {isUploading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Upload Submission</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submissions Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* PDF Dropdown */}
            <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl font-bold">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span>PDF Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <select
                  value={selectedPdf}
                  onChange={(e) => setSelectedPdf(e.target.value)}
                  className="w-full border-2 border-green-200 rounded-2xl p-3 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Select a Student PDF</option>
                  {currentExamSubmissions.map((sub) => (
                    <option key={sub._id} value={sub.studentAnswerSheet}>
                      Submission {sub._id.slice(-6)} —{" "}
                      {new Date(sub.uploadedAt).toLocaleString()}
                    </option>
                  ))}
                </select>

                {selectedPdf && (
                  <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-green-200">
                    <iframe
                      src={selectedPdf}
                      title="PDF Preview"
                      width="100%"
                      height="400px"
                      className="border-0"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Exam Details */}
            <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm mt-10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl font-bold">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Selected Exam Details</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {examName || "No Exam Selected"}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent>
                {currentExamSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No submission found for <b>{examName}</b>
                    </p>
                    <p className="text-sm text-gray-400">
                      Upload to get started with this exam
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Show details from the first submission of this exam */}
                    {currentExamSubmissions.slice(0, 1).map((selectedSub) => (
                      <React.Fragment key={selectedSub._id}>
                        {/* 🖼 Question Paper */}
                        <Card className="rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-green-700 flex items-center space-x-2">
                              <ImgIcon className="w-4 h-4" />
                              <span>Question Paper</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <img
                              src={selectedSub.questionPaper}
                              alt="Question Paper"
                              className="rounded-lg w-full h-48 object-contain shadow-md"
                            />
                          </CardContent>
                        </Card>

                        {/* 🗝 Answer Key */}
                        <Card className="rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-green-700 flex items-center space-x-2">
                              <Key className="w-4 h-4" />
                              <span>Answer Key</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <img
                              src={selectedSub.answerKey}
                              alt="Answer Key"
                              className="rounded-lg w-full h-48 object-contain shadow-md"
                            />
                          </CardContent>
                        </Card>

                        {/* 📄 Student Answer Sheet */}
                        <div className="md:col-span-2">
                          {/* <Card className="rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                            <CardHeader>
                              <CardTitle className="text-green-700 flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Student Answer Sheet</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              <iframe
                                src={selectedSub.studentAnswerSheet}
                                title="Student Answer Sheet"
                                className="w-full h-[400px] rounded-lg border shadow-sm"
                              ></iframe>
                            </CardContent>
                          </Card> */}
                        </div>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* All Uploaded Submissions for this exam */}

            {/* <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl font-bold">
                  <Download className="w-5 h-5 text-green-600" />
                  <span>Uploaded Submissions</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {currentExamSubmissions.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentExamSubmissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentExamSubmissions.map((sub, index) => (
                      <motion.div
                        key={sub._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="text-xs">
                                {new Date(sub.uploadedAt).toLocaleDateString()}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                ID: {sub._id.slice(-5)}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <ImagePreview
                                label="Question Paper"
                                src={sub.questionPaper}
                                icon={<ImgIcon className="w-3 h-3 text-green-600" />}
                              />
                              <ImagePreview
                                label="Answer Key"
                                src={sub.answerKey}
                                icon={<Key className="w-3 h-3 text-green-600" />}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No submissions for this exam yet</p>
                    <p className="text-sm text-gray-400">
                      Upload your first submission to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* --------------------- Helper Components --------------------- */

const UploadBox = ({ id, label, icon, file, accept, onChange }) => (
  <div className="space-y-3">
    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
      {icon}
      <span>{label}</span>
    </label>
    <div className="border-2 border-dashed border-green-300 rounded-2xl p-6 text-center hover:border-green-400 transition-colors bg-green-50/50">
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="hidden"
        id={id}
      />
      <label htmlFor={id} className="cursor-pointer">
        <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          {file ? file.name : "Click to upload"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Supports {accept}</p>
      </label>
    </div>
  </div>
);

const ImagePreview = ({ label, src, icon }) => (
  <div>
    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
      {icon}
      <span>{label}</span>
    </p>
    <img
      src={src}
      alt={label}
      className="w-full h-24 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
    />
  </div>
);

export default Teacher;