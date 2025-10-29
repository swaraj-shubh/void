import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image as ImgIcon, Key, Download, Eye, Star, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Teacher = ({ examName }) => {
  const [studentAnswerSheet, setStudentAnswerSheet] = useState(null);
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  // ✅ NEW: Evaluation state variables
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

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
      const response = await axios.post("http://localhost:5000/api/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert("✅ Uploaded successfully! Evaluation will start automatically.");
      setStudentAnswerSheet(null);
      setQuestionPaper(null);
      setAnswerKey(null);
      
      // Refresh data
      fetchSubmissions();
      fetchEvaluationResults();
      
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



  // ✅ NEW: Fetch evaluation results
  const fetchEvaluationResults = async () => {
    if (!examName) return;
    
    try {
      const res = await axios.get(`http://localhost:5000/api/evaluations/exam/${examName}`);
      setEvaluationResults(res.data);
    } catch (err) {
      console.error("Error fetching evaluations:", err);
    }
  };

  // ✅ NEW: Manual evaluation trigger
  const handleEvaluate = async (submissionId) => {
    setIsEvaluating(true);
    try {
      await axios.post(`http://localhost:5000/api/evaluations/${submissionId}/evaluate`);
      alert("✅ Evaluation started! Results will appear shortly.");
      // Refresh evaluation results after a delay
      setTimeout(() => {
        fetchEvaluationResults();
      }, 3000);
    } catch (err) {
      console.error("Evaluation error:", err);
      alert("❌ Evaluation failed. Make sure FastAPI server is running on port 8000.");
    } finally {
      setIsEvaluating(false);
    }
  };
// ✅ NEW: Generate and download PDF report
const generateReport = async (evalResult) => {
  try {
    // Extract data from tasks_output
    const tasks = evalResult.evaluationData?.result?.tasks_output || [];
    const evaluationTask = tasks.find(task => task.agent === "Answer Evaluation Specialist");
    const insightsTask = tasks.find(task => task.agent === "Academic Performance Analyst");
    
    // Parse the data
    let evaluationData = {};
    let insightsData = {};
    
    try {
      if (evaluationTask?.raw) {
        evaluationData = typeof evaluationTask.raw === 'string' 
          ? JSON.parse(evaluationTask.raw) 
          : evaluationTask.raw;
      }
      if (insightsTask?.raw) {
        insightsData = typeof insightsTask.raw === 'string' 
          ? JSON.parse(insightsTask.raw) 
          : insightsTask.raw;
      }
    } catch (e) {
      console.log("Error parsing data for PDF:", e);
    }

    const summary = evaluationData.summary || {};
    const insights = insightsData || {};
    
    // Create PDF content
    const pdfContent = `
      <html>
        <head>
          <title>Evaluation Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .score { font-size: 24px; font-weight: bold; color: #059669; text-align: center; margin: 20px 0; }
            .section { margin: 25px 0; }
            .section-title { font-size: 18px; font-weight: bold; color: #059669; margin-bottom: 10px; }
            .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
            .stat-item { padding: 8px; background: #f0fdf4; border-radius: 5px; }
            .feedback { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .strengths { color: #059669; }
            .improvements { color: #dc2626; }
            ul { margin: 5px 0; padding-left: 20px; }
            li { margin: 3px 0; }
            .timestamp { text-align: right; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Student Evaluation Report</h1>
            <h3>Exam: ${evalResult.examName}</h3>
          </div>
          
          <div class="score">
            Overall Score: ${summary.accuracy_percent || insights.score_percentage || "N/A"}
          </div>
          
          <div class="section">
            <div class="section-title">Performance Summary</div>
            <div class="stats">
              <div class="stat-item"><strong>Total Questions:</strong> ${summary.total_questions || insights.total_questions || "N/A"}</div>
              <div class="stat-item"><strong>Correct Answers:</strong> ${summary.correct_answers || insights.correct_answers || "N/A"}</div>
              <div class="stat-item"><strong>Wrong Answers:</strong> ${summary.wrong_answers || insights.wrong_answers || "N/A"}</div>
              <div class="stat-item"><strong>Unanswered:</strong> ${summary.unanswered || insights.unanswered || "N/A"}</div>
            </div>
          </div>
          
          ${insights.overall_performance ? `
          <div class="section">
            <div class="section-title">Overall Performance</div>
            <div class="feedback">${insights.overall_performance}</div>
          </div>
          ` : ''}
          
          ${insights.strengths && insights.strengths.length > 0 ? `
          <div class="section">
            <div class="section-title strengths">Strengths</div>
            <ul>${insights.strengths.map(strength => `<li>${strength}</li>`).join('')}</ul>
          </div>
          ` : ''}
          
          ${insights.areas_for_improvement && insights.areas_for_improvement.length > 0 ? `
          <div class="section">
            <div class="section-title improvements">Areas for Improvement</div>
            <ul>${insights.areas_for_improvement.map(area => `<li>${area}</li>`).join('')}</ul>
          </div>
          ` : ''}
          
          ${insights.motivational_feedback ? `
          <div class="section">
            <div class="section-title">Motivational Feedback</div>
            <div class="feedback">${insights.motivational_feedback}</div>
          </div>
          ` : ''}
          
          ${evalResult.pipeline_review ? `
          <div class="section">
            <div class="section-title">Evaluation Quality Check</div>
            <div class="stats">
              <div class="stat-item"><strong>OCR Quality:</strong> ${evalResult.pipeline_review.ocr_quality?.status || "Good"}</div>
              <div class="stat-item"><strong>Validation:</strong> ${evalResult.pipeline_review.evaluation_results_validation?.status || "Validated"}</div>
            </div>
          </div>
          ` : ''}
          
          <div class="timestamp">
            Report generated on: ${new Date().toLocaleString()}
          </div>
        </body>
      </html>
    `;

    // Create PDF using browser's print functionality
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.print();
      // Optional: Close window after print dialog closes
      // printWindow.onafterprint = () => printWindow.close();
    };
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF report");
  }
};


  useEffect(() => {
    fetchSubmissions();
    if (examName) {
      fetchEvaluationResults();
    }
  }, [examName]);

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
                  label="Student Answer Sheet (Image)"
                  icon={<FileText className="w-4 h-4 text-green-600" />}
                  file={studentAnswerSheet}
                  accept="image/*"
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

{/* ✅ UPDATED: Evaluation Results Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.3 }}
>
  <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm mt-8">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-xl font-bold">
        <Star className="w-5 h-5 text-blue-600" />
        <span>Evaluation Results</span>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {evaluationResults.length}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      {evaluationResults.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No evaluation results yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Upload submissions to see evaluation results
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {evaluationResults.map((evalResult) => {
            // Extract data from tasks_output
            const tasks = evalResult.evaluationData?.result?.tasks_output || [];
            const evaluationTask = tasks.find(task => task.agent === "Answer Evaluation Specialist");
            const insightsTask = tasks.find(task => task.agent === "Academic Performance Analyst");
            
            // Parse the evaluation data
            let evaluationData = {};
            let insightsData = {};
            
            try {
              if (evaluationTask?.raw) {
                evaluationData = typeof evaluationTask.raw === 'string' 
                  ? JSON.parse(evaluationTask.raw) 
                  : evaluationTask.raw;
              }
              if (insightsTask?.raw) {
                insightsData = typeof insightsTask.raw === 'string' 
                  ? JSON.parse(insightsTask.raw) 
                  : insightsTask.raw;
              }
            } catch (e) {
              console.log("Error parsing evaluation data:", e);
            }
            
            const summary = evaluationData.summary || {};
            const insights = insightsData || {};

            return (
              <Card 
                key={evalResult._id} 
                className="p-4 border-2 border-green-100 hover:border-green-300 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEvaluation(selectedEvaluation?._id === evalResult._id ? null : evalResult)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {evalResult.manual_review_needed ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm font-medium">
                      {new Date(evalResult.evaluatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge 
                    className={
                      summary.accuracy_percent?.includes("7") || 
                      summary.accuracy_percent?.includes("8") ||
                      summary.accuracy_percent?.includes("9") ||
                      summary.accuracy_percent?.includes("100")
                        ? "bg-green-100 text-green-700"
                        : summary.accuracy_percent?.includes("5") || 
                          summary.accuracy_percent?.includes("6")
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {summary.accuracy_percent || insights.score_percentage || "Pending"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Total Questions:</strong> {summary.total_questions || insights.total_questions || "N/A"}
                  </div>
                  <div>
                    <strong>Correct:</strong> {summary.correct_answers || insights.correct_answers || "N/A"}
                  </div>
                  <div>
                    <strong>Wrong:</strong> {summary.wrong_answers || insights.wrong_answers || "N/A"}
                  </div>
                  <div>
                    <strong>Unanswered:</strong> {summary.unanswered || insights.unanswered || "N/A"}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedEvaluation?._id === evalResult._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >



                          {/* Download Report Button */}
<div className="mt-4">
  <Button
    onClick={() => generateReport(evalResult)}
    className="w-full bg-purple-600 hover:bg-purple-700"
  >
    <Download className="w-4 h-4 mr-2" />
    Download Evaluation Report (PDF)
  </Button>
</div>




                    {/* Insights */}
                    {(insights.overall_performance || insights.strengths?.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-700">Feedback & Insights</h4>
                        {insights.overall_performance && (
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm">{insights.overall_performance}</p>
                          </div>
                        )}
                        
                        {insights.strengths && insights.strengths.length > 0 && (
                          <div>
                            <h5 className="font-medium text-sm text-green-600">Strengths:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                              {insights.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {insights.areas_for_improvement && insights.areas_for_improvement.length > 0 && (
                          <div>
                            <h5 className="font-medium text-sm text-orange-600">Areas for Improvement:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                              {insights.areas_for_improvement.map((area, index) => (
                                <li key={index}>{area}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {insights.motivational_feedback && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-700">
                              {insights.motivational_feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Pipeline Status */}
                    {evalResult.pipeline_review && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Pipeline Status</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            OCR: {evalResult.pipeline_review.ocr_quality?.status || "Good"}
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            Validation: {evalResult.pipeline_review.evaluation_results_validation?.status || "Validated"}
                          </Badge>
                        </div>
                        {evalResult.pipeline_review.ocr_quality?.details && (
                          <p className="text-xs text-gray-600 mt-2">
                            {evalResult.pipeline_review.ocr_quality.details}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Detailed Results */}
                    {evaluationData.detailed_results && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Question-wise Results</h4>
                        <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                          {evaluationData.detailed_results.map((result, index) => (
                            <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
                              <span>{result.question}</span>
                              <Badge 
                                className={
                                  result.status === "correct" 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-red-100 text-red-700"
                                }
                              >
                                {result.status === "correct" ? "✓" : "✗"} {result.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </Card>
            );
          })}
        </div>
      )}





    </CardContent>
  </Card>
</motion.div>

          </motion.div>

          {/* Submissions Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Selected Exam Details */}
            <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
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
                    className="space-y-6"
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
                        <Card className="rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-green-700 flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <span>Student Answer Sheet</span>
                              {/* ✅ NEW: Manual Evaluation Button */}
                              <Button
                                onClick={() => handleEvaluate(selectedSub._id)}
                                disabled={isEvaluating}
                                size="sm"
                                className="ml-auto bg-blue-600 hover:bg-blue-700"
                              >
                                {isEvaluating ? (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-3 h-3 animate-spin" />
                                    <span>Evaluating...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <Star className="w-3 h-3" />
                                    <span>Evaluate</span>
                                  </div>
                                )}
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <img
                              src={selectedSub.studentAnswerSheet}
                              alt="Student Answer Sheet"
                              className="rounded-lg w-full h-48 object-contain shadow-md"
                            />
                          </CardContent>
                        </Card>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* All Uploaded Submissions for this exam */}
            <Card className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
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
                              <ImagePreview
                                label="Student Answer"
                                src={sub.studentAnswerSheet}
                                icon={<FileText className="w-3 h-3 text-green-600" />}
                              />
                            </div>
                            
                            {/* ✅ NEW: Quick Evaluation Status */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <Button
                                onClick={() => handleEvaluate(sub._id)}
                                disabled={isEvaluating}
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                {isEvaluating ? (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-3 h-3 animate-spin" />
                                    <span>Evaluating...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <Star className="w-3 h-3" />
                                    <span>Evaluate Submission</span>
                                  </div>
                                )}
                              </Button>
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
            </Card>
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

// Helper to safely parse JSON from tasks_output
const parseTaskData = (rawData) => {
  if (!rawData) return {};
  try {
    return typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  } catch (e) {
    console.log("Parse error:", e);
    return {};
  }
};

import jsPDF from 'jspdf';

// ✅ NEW: Generate PDF with jsPDF
const generateReport = async (evalResult) => {
  try {
    const pdf = new jsPDF();
    
    // Extract data
    const tasks = evalResult.evaluationData?.result?.tasks_output || [];
    const evaluationTask = tasks.find(task => task.agent === "Answer Evaluation Specialist");
    const insightsTask = tasks.find(task => task.agent === "Academic Performance Analyst");
    
    let evaluationData = {};
    let insightsData = {};
    
    try {
      if (evaluationTask?.raw) {
        evaluationData = typeof evaluationTask.raw === 'string' 
          ? JSON.parse(evaluationTask.raw) 
          : evaluationTask.raw;
      }
      if (insightsTask?.raw) {
        insightsData = typeof insightsTask.raw === 'string' 
          ? JSON.parse(insightsTask.raw) 
          : insightsTask.raw;
      }
    } catch (e) {
      console.log("Error parsing data for PDF:", e);
    }

    const summary = evaluationData.summary || {};
    const insights = insightsData || {};
    
    let yPosition = 20;
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Student Evaluation Report", 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    pdf.setFontSize(14);
    pdf.text(`Exam: ${evalResult.examName}`, 105, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Score
    pdf.setFontSize(16);
    pdf.setTextColor(5, 150, 105);
    pdf.text(`Overall Score: ${summary.accuracy_percent || insights.score_percentage || "N/A"}`, 105, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Performance Summary
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Performance Summary:", 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pdf.text(`Total Questions: ${summary.total_questions || insights.total_questions || "N/A"}`, 30, yPosition);
    yPosition += 8;
    pdf.text(`Correct Answers: ${summary.correct_answers || insights.correct_answers || "N/A"}`, 30, yPosition);
    yPosition += 8;
    pdf.text(`Wrong Answers: ${summary.wrong_answers || insights.wrong_answers || "N/A"}`, 30, yPosition);
    yPosition += 8;
    pdf.text(`Unanswered: ${summary.unanswered || insights.unanswered || "N/A"}`, 30, yPosition);
    yPosition += 15;
    
    // Add more sections as needed...
    
    // Save PDF
    pdf.save(`evaluation-report-${evalResult.examName}-${new Date().toISOString().split('T')[0]}.pdf`);
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF report");
  }
};