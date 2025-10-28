import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePhotograph, HiOutlineRefresh, HiCheckCircle, HiOutlineEye, HiOutlineDocumentText, HiOutlineCode, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineChartBar, HiOutlineDocumentReport, HiOutlineAcademicCap, HiOutlineLightBulb, HiChevronDown } from "react-icons/hi";
import { Button } from "@/components/ui/button";

export default function AlignmentAgentPlayground() {
  const [alignmentComplete, setAlignmentComplete] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [scoringComplete, setScoringComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analyticsComplete, setAnalyticsComplete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const reportRef = useRef(null);

  // Sample data from Agent 3
  const scoringResults = {
    "studentId": "STU_2024_001",
    "totalScore": 4,
    "totalMarks": 5,
    "percentage": 80.0,
    "questionWise": [
      {
        "id": 1,
        "question": "What is 2+2?",
        "studentAnswer": "4",
        "correctAnswer": "4",
        "isCorrect": true,
        "marks": 1
      },
      {
        "id": 2,
        "question": "The capital of France is ______",
        "studentAnswer": "Paris",
        "correctAnswer": "Paris",
        "isCorrect": true,
        "marks": 1
      },
      {
        "id": 3,
        "question": "Largest planet in solar system",
        "studentAnswer": "Jupiter",
        "correctAnswer": "Jupiter",
        "isCorrect": true,
        "marks": 1
      },
      {
        "id": 4,
        "question": "Chemical symbol for Gold",
        "studentAnswer": "Ag",
        "correctAnswer": "Au",
        "isCorrect": false,
        "marks": 0
      },
      {
        "id": 5,
        "question": "______ is the process of plants making food",
        "studentAnswer": "Photosynthesis",
        "correctAnswer": "Photosynthesis",
        "isCorrect": true,
        "marks": 1
      }
    ]
  };

  const questionPaper = {
    "subject": "Mathematics & Science",
    "examDate": "2024-03-20",
    "difficulty": "Medium",
    "topics": ["Basic Arithmetic", "Geography", "Astronomy", "Chemistry", "Biology"],
    "timeAllowed": "2 hours",
    "totalQuestions": 5
  };

  const [analyticsReport, setAnalyticsReport] = useState({
    studentId: "STU_2024_001",
    studentName: "John Doe",
    subject: "Mathematics & Science",
    examDate: "March 20, 2024",
    overallScore: 80,
    grade: "B",
    performanceSummary: "Good overall performance with strong fundamentals in mathematics and science, but needs improvement in chemistry concepts.",
    strengths: [
      "Excellent mathematical reasoning and calculation skills",
      "Strong knowledge of geographical facts and astronomy",
      "Good understanding of biological processes",
      "Consistent performance in basic arithmetic operations"
    ],
    weaknesses: [
      "Chemistry fundamentals require significant improvement",
      "Difficulty remembering chemical symbols and elements",
      "Needs better attention to detail in scientific terminology",
      "Scientific vocabulary retention needs enhancement"
    ],
    recommendations: [
      "Daily practice of periodic table and chemical symbols",
      "Focus on chemistry fundamentals with additional study materials",
      "Regular revision of scientific terminology and definitions",
      "Practice tests specifically targeting chemistry concepts"
    ],
    performanceAnalysis: {
      mathematicalSkills: 90,
      scientificKnowledge: 85,
      memoryRecall: 75,
      attentionToDetail: 70,
      timeManagement: 88,
      conceptualUnderstanding: 82
    },
    comparativeAnalysis: {
      classAverage: 72,
      percentile: 75,
      improvementAreas: ["Chemistry", "Scientific Terminology"],
      predictedPerformance: 82
    },
    learningStyle: "Visual Learner",
    studyRecommendations: [
      "Use visual aids for chemistry concepts",
      "Create mind maps for scientific terminology",
      "Watch educational videos for complex topics",
      "Use color-coded notes for better retention"
    ]
  });

  const executeAnalytics = async () => {
    setProcessing(true);
    
    // Step 1: Data collection animation
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Data processing animation
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Step 3: Analysis animation
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Step 4: Report generation
    setCurrentStep(4);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAnalyticsComplete(true);
    setProcessing(false);
  };

  const viewReport = () => {
    setShowReport(true);
    // Scroll to report section
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Sample data
  const studentAnswers = {
    studentId: "STU_2024_001",
    answers: [
      { id: 1, type: "mcq", question: "What is 2+2?", extracted: "4" },
      { id: 2, type: "fill-blank", question: "The capital of France is ______", extracted: "Paris" },
      { id: 3, type: "one-word", question: "Largest planet in solar system", extracted: "Jupiter" },
      { id: 4, type: "mcq", question: "Chemical symbol for Gold", extracted: "Ag" },
      { id: 5, type: "fill-blank", question: "______ is the process of plants making food", extracted: "Photosynthesis" }
    ]
  };

  const answerKey = {
    subject: "Mathematics & Science",
    answers: [
      { id: 1, correctAnswer: "4", marks: 1 },
      { id: 2, correctAnswer: "Paris", marks: 1 },
      { id: 3, correctAnswer: "Jupiter", marks: 1 },
      { id: 4, correctAnswer: "Au", marks: 1 },
      { id: 5, correctAnswer: "Photosynthesis", marks: 1 }
    ]
  };

  const executeScoring = async () => {
    setProcessing(true);
    
    // Move student answers to center
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Evaluate each answer one by one
    for (let i = 0; i < studentAnswers.answers.length; i++) {
      setCurrentStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Calculate final results
    const results = calculateResults();
    setScoringResults(results);
    
    setScoringComplete(true);
    setShowResults(true);
    setProcessing(false);
  };

  const calculateResults = () => {
    const questionWise = studentAnswers.answers.map((studentAns, index) => {
      const correctAns = answerKey.answers.find(ans => ans.id === studentAns.id);
      const isCorrect = studentAns.extracted.toLowerCase() === correctAns.correctAnswer.toLowerCase();
      
      return {
        id: studentAns.id,
        question: studentAns.question,
        studentAnswer: studentAns.extracted,
        correctAnswer: correctAns.correctAnswer,
        isCorrect: isCorrect,
        marks: isCorrect ? correctAns.marks : 0
      };
    });

    const totalScore = questionWise.reduce((sum, q) => sum + q.marks, 0);
    const totalMarks = answerKey.answers.reduce((sum, ans) => sum + ans.marks, 0);
    const percentage = (totalScore / totalMarks * 100).toFixed(1);

    return {
      studentId: studentAnswers.studentId,
      totalScore,
      totalMarks,
      percentage,
      questionWise
    };
  };

  const isAnswerCorrect = (answerId) => {
    if (currentStep === 0) return null;
    const studentAns = studentAnswers.answers.find(ans => ans.id === answerId);
    const correctAns = answerKey.answers.find(ans => ans.id === answerId);
    return studentAns && correctAns && studentAns.extracted.toLowerCase() === correctAns.correctAnswer.toLowerCase();
  };
  const evaluationChallenges = [
    "Handwriting Variability",
    "Spelling Variations", 
    "Answer Positioning Errors",
    "Overwriting/Strikethroughs",
    "Multiple Markings in MCQs",
    "Faint/Blurred Writing",
    "Noise Interference",
    "Reference Script Rigidity"
  ];

  const extractedData = {
    studentId: "STU_2024_001",
    answers: [
      { id: 1, type: "mcq", extracted: "A", confidence: 92.3 },
      { id: 2, type: "fill-blank", extracted: "Paris", confidence: 88.7 },
      { id: 3, type: "one-word", extracted: "Jupiter", confidence: 95.1 },
      { id: 4, type: "mcq", extracted: "Ag", confidence: 84.2 },
      { id: 5, type: "fill-blank", extracted: "Photosynthesis", confidence: 90.5 }
    ],
    overallConfidence: 90.2,
    challengesDetected: ["Handwriting Variability", "Minor Spelling Variations"]
  };

  const executeEvaluation = async () => {
    setProcessing(true);
    
    // Wait for breaking animation to complete
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Show JSON output
    setShowJson(true);
    setEvaluationComplete(true);
    setProcessing(false);
  };

  const distortionTypes = [
    "Skewness (±15° rotation)",
    "Perspective Distortion", 
    "Scale Variations (±10%)",
    "Translation Shifts",
    "Padding/Margins Issues",
    "Paper Deformations",
    "Noise & Artifacts",
    "Contrast/Brightness Variations"
  ];

  const transformations = {
    rotation: -2.5,
    scale: 1.08,
    translation: { x: 15, y: -8 },
    perspective: "corrected",
    confidence: 94.7
  };

  const executeAlignment = async () => {
    setProcessing(true);
    
    // Wait for spin and shrink animation to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show output after animation
    setShowOutput(true);
    setAlignmentComplete(true);
    setProcessing(false);
  };

  const resetProcess = () => {
    setAnalyticsComplete(false);
    setShowReport(false);
    setCurrentStep(0);
    setProcessing(false);
    setScoringComplete(false);
    setShowResults(false);
    setAlignmentComplete(false);
    setShowOutput(false);
    setEvaluationComplete(false);
    setShowJson(false);
  };

  return (
    <>
{/* agent 1 */}

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <HiOutlinePhotograph className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Agent 1: Alignment Expert
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Corrects image distortions and aligns scanned answer sheets with the original template
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Input & Controls */}
          <div className="space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alignment Control</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-800 mb-2">Current Status</div>
                  <div className={`text-lg font-semibold ${
                    alignmentComplete ? 'text-green-600' : 
                    processing ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {alignmentComplete ? '✓ Alignment Complete' :
                     processing ? '🔄 Processing...' : 'Ready for Alignment'}
                  </div>
                </div>

                <Button
                  onClick={executeAlignment}
                  disabled={processing || alignmentComplete}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg disabled:bg-gray-400"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineRefresh className="w-5 h-5 animate-spin" />
                      Processing Alignment...
                    </div>
                  ) : alignmentComplete ? (
                    <div className="flex items-center gap-2">
                      <HiCheckCircle className="w-5 h-5" />
                      Alignment Complete
                    </div>
                  ) : (
                    "Execute Alignment Process"
                  )}
                </Button>

                {alignmentComplete && (
                  <Button
                    onClick={resetProcess}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Reset Process
                  </Button>
                )}
              </div>
            </div>

            {/* Transformation Details */}
            {alignmentComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transformation Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Rotation</span>
                    <span className="text-lg font-bold text-green-600">{transformations.rotation}°</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Scale</span>
                    <span className="text-lg font-bold text-green-600">{transformations.scale}x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Translation</span>
                    <span className="text-lg font-bold text-green-600">
                      X:{transformations.translation.x}, Y:{transformations.translation.y}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Confidence</span>
                    <span className="text-lg font-bold text-green-600">{transformations.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Image Animation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Image Alignment Process
            </h3>

            <div className="relative h-112 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
              
              {/* Input Image with Spin & Shrink Animation */}
              <AnimatePresence mode="wait">
                {!showOutput ? (
                  <motion.div
                    key="input"
                    className="absolute inset-0 flex items-center justify-center p-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: processing ? [1, 0.8, 0.6, 0.4, 0.2, 0.1] : 1,
                      opacity: processing ? [1, 0.8, 0.6, 0.4, 0.2, 0] : 1,
                      rotate: processing ? [0, 90, 180, 270, 360, 450] : 0,
                    }}
                    transition={{ 
                      duration: processing ? 0.5 : 0.5,
                      ease: processing ? "easeInOut" : "easeOut"
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div className="relative inline-block">
                        {/* Distortion overlay effect */}
                        {processing && (
                          <motion.div
                            className="absolute inset-0 bg-yellow-200 rounded-lg mix-blend-multiply"
                            animate={{ 
                              opacity: [0.3, 0.1, 0.3],
                              scale: [1, 1.02, 1]
                            }}
                            transition={{ 
                              duration: 0.5,
                              repeat: Infinity 
                            }}
                          />
                        )}
                        
                        <img
                          src="/agent1.1.jpg"
                          alt="Distorted Answer Sheet"
                          className="w-64 h-80 object-cover rounded-lg shadow-2xl border-4 border-red-400"
                        />
                        
                        {/* Animated distortion indicators */}
                        {processing && (
                          <>
                            <motion.div
                              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                            />
                          </>
                        )}
                      </div>
                      
                      <motion.div
                        className="mt-4"
                        animate={processing ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                        transition={{ duration: 0.5, repeat: processing ? Infinity : 0 }}
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          Distorted Input Image
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="output"
                    className="absolute inset-0 flex items-center justify-center p-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.8 
                    }}
                  >
                    <div className="text-center">
                      <div className="relative inline-block">
                        {/* Success glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-green-200 rounded-lg mix-blend-multiply"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.2, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        />
                        
                        <motion.img
                          src="/agent1.2.jpg"
                          alt="Aligned Answer Sheet"
                          className="w-64 h-80 object-cover rounded-lg shadow-2xl border-4 border-green-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            delay: 0.1
                          }}
                        />
                        
                        {/* Success indicators */}
                        <motion.div
                          className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.6, 
                            type: "spring",
                            stiffness: 300
                          }}
                        >
                          <HiCheckCircle className="w-5 h-5 text-white" />
                        </motion.div>

                        {/* Floating success particles */}
                        {alignmentComplete && (
                          <>
                            <motion.div
                              className="absolute -top-1 -left-1 w-3 h-3 bg-green-400 rounded-full"
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ duration: 0.2, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                              animate={{
                                y: [0, 10, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ duration: 0.2, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="absolute top-0 right-1/2 w-2 h-2 bg-green-400 rounded-full"
                              animate={{
                                x: [0, 10, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ duration: 0.2, repeat: Infinity, delay: 0.3 }}
                            />
                          </>
                        )}
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Corrected Output Image
                        </span>
                      </motion.div>

                      {/* Success message */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3"
                      >
                        <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          ✓ Alignment Successful
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Processing Animation Overlay */}
              <AnimatePresence>
                {processing && !showOutput && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <motion.p 
                        className="text-lg font-semibold mb-2"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        Correcting Distortions...
                      </motion.p>
                      <p className="text-sm opacity-90">Applying transformations</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Process Steps */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                !processing && !alignmentComplete ? 
                'bg-blue-100 border-2 border-blue-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 1</div>
                <div className="text-xs text-gray-600">Input</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                processing ? 
                'bg-yellow-100 border-2 border-yellow-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 2</div>
                <div className="text-xs text-gray-600">Processing</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                alignmentComplete ? 
                'bg-green-100 border-2 border-green-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 3</div>
                <div className="text-xs text-gray-600">Output</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* agent 2 */}

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <HiOutlineEye className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Agent 2: Evaluation Expert
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Handwriting recognition and answer extraction from aligned answer sheets
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Input & Controls */}
          <div className="space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Evaluation Control</h3>
              
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-purple-800 mb-2">Current Status</div>
                  <div className={`text-lg font-semibold ${
                    evaluationComplete ? 'text-green-600' : 
                    processing ? 'text-yellow-600' : 'text-purple-600'
                  }`}>
                    {evaluationComplete ? '✓ Evaluation Complete' :
                     processing ? '🔄 Processing...' : 'Ready for Evaluation'}
                  </div>
                </div>

                <Button
                  onClick={executeEvaluation}
                  disabled={processing || evaluationComplete}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg disabled:bg-gray-400"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineEye className="w-5 h-5 animate-pulse" />
                      Extracting Answers...
                    </div>
                  ) : evaluationComplete ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineDocumentText className="w-5 h-5" />
                      Evaluation Complete
                    </div>
                  ) : (
                    "Execute Evaluation Process"
                  )}
                </Button>

                {evaluationComplete && (
                  <Button
                    onClick={resetProcess}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Reset Process
                  </Button>
                )}
              </div>
            </div>

            {/* Extracted Data Summary */}
            {evaluationComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Extraction Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Answers Extracted</span>
                    <span className="text-lg font-bold text-green-600">{extractedData.answers.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Overall Confidence</span>
                    <span className="text-lg font-bold text-green-600">{extractedData.overallConfidence}%</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Challenges Detected</span>
                    <div className="text-xs text-gray-600 mt-1">
                      {extractedData.challengesDetected.join(", ")}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Image to JSON Animation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Handwriting Recognition Process
            </h3>

            <div className="relative h-110 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
              
              {/* Input Image Breaking Animation */}
              <AnimatePresence mode="wait">
                {!showJson ? (
                  <motion.div
                    key="input"
                    className="absolute inset-0 flex items-center justify-center p-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: processing ? [1, 1.1, 1] : 1,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center">
                      <div className="relative inline-block">
                        {/* Breaking effect overlay */}
                        {processing && (
                          <>
                            <motion.div
                              className="absolute inset-0 bg-red-200 rounded-lg mix-blend-multiply"
                              animate={{ 
                                opacity: [0.2, 0.4, 0.2],
                              }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            />
                            
                            {/* Breaking lines animation */}
                            <motion.div
                              className="absolute inset-0 border-2 border-red-500 rounded-lg"
                              initial={{ scale: 1, opacity: 0 }}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0, 1, 0],
                              }}
                              transition={{ duration: 0.8 }}
                            />
                            
                            {/* Image breaking into pieces */}
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 0.95, 1],
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Breaking pieces */}
                              <motion.div
                                className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-lg"
                                animate={{
                                  x: [-10, -30, -50],
                                  y: [-10, -20, -30],
                                  opacity: [0, 1, 0],
                                  rotate: [0, 45, 90],
                                }}
                                transition={{ duration: 1.2 }}
                              />
                              <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-lg"
                                animate={{
                                  x: [10, 30, 50],
                                  y: [-10, -25, -40],
                                  opacity: [0, 1, 0],
                                  rotate: [0, -45, -90],
                                }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                              />
                              <motion.div
                                className="absolute -bottom-2 -left-2 w-7 h-7 bg-red-500 rounded-lg"
                                animate={{
                                  x: [-10, -25, -45],
                                  y: [10, 25, 40],
                                  opacity: [0, 1, 0],
                                  rotate: [0, 60, 120],
                                }}
                                transition={{ duration: 1.2, delay: 0.4 }}
                              />
                              <motion.div
                                className="absolute -bottom-2 -right-2 w-5 h-5 bg-red-500 rounded-lg"
                                animate={{
                                  x: [10, 25, 45],
                                  y: [10, 20, 35],
                                  opacity: [0, 1, 0],
                                  rotate: [0, -60, -120],
                                }}
                                transition={{ duration: 1.2, delay: 0.6 }}
                              />
                            </motion.div>
                          </>
                        )}
                        
                        <img
                          src="/agent1.2.jpg"
                          alt="Aligned Answer Sheet"
                          className="w-64 h-80 object-cover rounded-lg shadow-2xl border-4 border-purple-400"
                        />
                      </div>
                      
                      <motion.div
                        className="mt-4"
                        animate={processing ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                        transition={{ duration: 0.5, repeat: processing ? Infinity : 0 }}
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          Processing Answer Sheet
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="json"
                    className="absolute inset-0 flex items-center justify-center p-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.8 
                    }}
                  >
                    <div className="text-center w-full max-w-md">
                      <div className="relative inline-block">
                        {/* JSON Document Icon */}
                        <motion.div
                          className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto border-4 border-green-300"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.3, 
                            type: "spring",
                            stiffness: 300
                          }}
                        >
                          <HiOutlineCode className="w-10 h-10 text-green-600" />
                        </motion.div>

                        {/* JSON Data Display */}
                        <motion.div
                          className="bg-gray-800 rounded-lg p-4 text-left max-h-64 overflow-y-auto"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="text-green-400 text-sm font-mono">
                            <div>{"{"}</div>
                            <div className="ml-4">
                              <div>"studentId": <span className="text-yellow-300">"{extractedData.studentId}"</span>,</div>
                              <div>"overallConfidence": <span className="text-blue-300">{extractedData.overallConfidence}</span>,</div>
                              <div>"answers": [</div>
                              <div className="ml-4">
                                {extractedData.answers.map((answer, index) => (
                                  <div key={index}>
                                    {"{"}
                                    <span className="ml-4">
                                      "id": <span className="text-purple-300">{answer.id}</span>,<br/>
                                      <span className="ml-4">"type": <span className="text-green-300">"{answer.type}"</span>,</span><br/>
                                      <span className="ml-4">"extracted": <span className="text-yellow-300">"{answer.extracted}"</span>,</span><br/>
                                      <span className="ml-4">"confidence": <span className="text-blue-300">{answer.confidence}</span></span>
                                    </span>
                                    <br/>
                                    {index === extractedData.answers.length - 1 ? "}" : "},"}
                                  </div>
                                ))}
                              </div>
                              <div>]</div>
                            </div>
                            <div>{"}"}</div>
                          </div>
                        </motion.div>

                        {/* Success indicators */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <HiOutlineDocumentText className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-4"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          JSON Data Extracted
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Processing Animation Overlay */}
              <AnimatePresence>
                {processing && !showJson && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity 
                        }}
                        className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <HiOutlineEye className="w-8 h-8 text-white" />
                      </motion.div>
                      <motion.p 
                        className="text-lg font-semibold mb-2"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        Analyzing Handwriting...
                      </motion.p>
                      <p className="text-sm opacity-90">Extracting answers from image</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Process Steps */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                !processing && !evaluationComplete ? 
                'bg-purple-100 border-2 border-purple-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 1</div>
                <div className="text-xs text-gray-600">Input Image</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                processing ? 
                'bg-yellow-100 border-2 border-yellow-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 2</div>
                <div className="text-xs text-gray-600">OCR Processing</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                evaluationComplete ? 
                'bg-green-100 border-2 border-green-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 3</div>
                <div className="text-xs text-gray-600">JSON Output</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


{/* agent 3 */}


          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <HiOutlineChartBar className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Agent 3: Scoring Expert
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Validates student answers against answer key and generates scoring results
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Student Answers JSON */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200"
            animate={{ 
              x: processing ? 100 : 0,
              scale: processing ? 0.9 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Student Answers
            </h3>
            
            <div className="bg-gray-800 rounded-lg p-4 text-left max-h-96 overflow-y-auto">
              <div className="text-blue-400 text-sm font-mono">
                <div>{"{"}</div>
                <div className="ml-4">
                  <div>"studentId": <span className="text-yellow-300">"{studentAnswers.studentId}"</span>,</div>
                  <div>"answers": [</div>
                  <div className="ml-4">
                    {studentAnswers.answers.map((answer, index) => (
                      <motion.div 
                        key={answer.id}
                        className="relative"
                        animate={{ 
                          backgroundColor: currentStep > index ? 
                            (isAnswerCorrect(answer.id) ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)') 
                            : 'transparent'
                        }}
                      >
                        <div>{"{"}</div>
                        <div className="ml-4">
                          "id": <span className="text-purple-300">{answer.id}</span>,<br/>
                          <span className="ml-4">"type": <span className="text-green-300">"{answer.type}"</span>,</span><br/>
                          <span className="ml-4">"question": <span className="text-yellow-300">"{answer.question}"</span>,</span><br/>
                          <span className="ml-4">"extracted": <span className="text-yellow-300">"{answer.extracted}"</span></span>
                        </div>
                        <div>
                          {index === studentAnswers.answers.length - 1 ? "}" : "},"}
                        </div>
                        
                        {/* Validation Icon */}
                        <AnimatePresence>
                          {currentStep > index && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className={`absolute -right-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center ${
                                isAnswerCorrect(answer.id) ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {isAnswerCorrect(answer.id) ? (
                                <HiOutlineCheckCircle className="w-3 h-3 text-white" />
                              ) : (
                                <HiOutlineXCircle className="w-3 h-3 text-white" />
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                  <div>]</div>
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Control & Animation */}
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-200 w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Scoring Control</h3>
              
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-orange-800 mb-2">Current Status</div>
                  <div className={`text-lg font-semibold ${
                    scoringComplete ? 'text-green-600' : 
                    processing ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {scoringComplete ? '✓ Scoring Complete' :
                     processing ? `🔄 Evaluating... (${currentStep}/${studentAnswers.answers.length})` : 
                     'Ready for Scoring'}
                  </div>
                </div>

                <Button
                  onClick={executeScoring}
                  disabled={processing || scoringComplete}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-lg disabled:bg-gray-400"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineChartBar className="w-5 h-5 animate-pulse" />
                      Validating Answers...
                    </div>
                  ) : scoringComplete ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineCheckCircle className="w-5 h-5" />
                      Scoring Complete
                    </div>
                  ) : (
                    "Execute Scoring Process"
                  )}
                </Button>

                {scoringComplete && (
                  <Button
                    onClick={resetProcess}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Reset Process
                  </Button>
                )}
              </div>
            </div>

            {/* Animation Area */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
              
              {/* Connection Line */}
              <motion.div
                className="absolute h-1 bg-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: processing ? '80%' : '0%' }}
                transition={{ duration: 1 }}
              />

              {/* Validation Particles */}
              <AnimatePresence>
                {processing && currentStep > 0 && (
                  <>
                    {studentAnswers.answers.slice(0, currentStep).map((answer, index) => (
                      <motion.div
                        key={answer.id}
                        className={`absolute w-4 h-4 rounded-full flex items-center justify-center ${
                          isAnswerCorrect(answer.id) ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        initial={{ 
                          scale: 0,
                          x: -100,
                          y: Math.random() * 80 - 40
                        }}
                        animate={{ 
                          scale: [0, 1, 0.8, 1],
                          x: 0,
                          y: Math.random() * 40 - 20
                        }}
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.2
                        }}
                      >
                        {isAnswerCorrect(answer.id) ? (
                          <HiOutlineCheckCircle className="w-2 h-2 text-white" />
                        ) : (
                          <HiOutlineXCircle className="w-2 h-2 text-white" />
                        )}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Processing Animation */}
              <AnimatePresence>
                {processing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-3"
                    />
                    <p className="text-orange-700 font-semibold">Validating Answers</p>
                    <p className="text-orange-600 text-sm">
                      Question {currentStep} of {studentAnswers.answers.length}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Preview */}
              <AnimatePresence>
                {scoringComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white p-4 rounded-lg shadow-lg border-2 border-green-200"
                  >
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {scoringResults.totalScore}/{scoringResults.totalMarks}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {scoringResults.percentage}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Final Score
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                !processing && !scoringComplete ? 
                'bg-blue-100 border-2 border-blue-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 1</div>
                <div className="text-xs text-gray-600">Input JSONs</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                processing ? 
                'bg-orange-100 border-2 border-orange-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 2</div>
                <div className="text-xs text-gray-600">Validation</div>
              </div>
              <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                scoringComplete ? 
                'bg-green-100 border-2 border-green-300 shadow-md' : 
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="font-semibold text-sm text-gray-800">Step 3</div>
                <div className="text-xs text-gray-600">Results</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Answer Key JSON */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200"
            animate={{ 
              x: processing ? -100 : 0,
              scale: processing ? 0.9 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Answer Key
            </h3>
            
            <div className="bg-gray-800 rounded-lg p-4 text-left max-h-96 overflow-y-auto">
              <div className="text-green-400 text-sm font-mono">
                <div>{"{"}</div>
                <div className="ml-4">
                  <div>"subject": <span className="text-yellow-300">"{answerKey.subject}"</span>,</div>
                  <div>"answers": [</div>
                  <div className="ml-4">
                    {answerKey.answers.map((answer, index) => (
                      <div key={answer.id}>
                        {"{"}
                        <div className="ml-4">
                          "id": <span className="text-purple-300">{answer.id}</span>,<br/>
                          <span className="ml-4">"correctAnswer": <span className="text-yellow-300">"{answer.correctAnswer}"</span>,</span><br/>
                          <span className="ml-4">"marks": <span className="text-blue-300">{answer.marks}</span></span>
                        </div>
                        <div>
                          {index === answerKey.answers.length - 1 ? "}" : "},"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>]</div>
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results JSON Display */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Scoring Results JSON
              </h3>
              
              <div className="bg-gray-800 rounded-lg p-4 text-left max-h-96 overflow-y-auto">
                <div className="text-green-400 text-sm font-mono">
                  <div>{"{"}</div>
                  <div className="ml-4">
                    <div>"studentId": <span className="text-yellow-300">"{scoringResults.studentId}"</span>,</div>
                    <div>"totalScore": <span className="text-blue-300">{scoringResults.totalScore}</span>,</div>
                    <div>"totalMarks": <span className="text-blue-300">{scoringResults.totalMarks}</span>,</div>
                    <div>"percentage": <span className="text-blue-300">{scoringResults.percentage}</span>,</div>
                    <div>"questionWise": [</div>
                    <div className="ml-4">
                      {scoringResults.questionWise.map((question, index) => (
                        <div key={question.id}>
                          {"{"}
                          <div className="ml-4">
                            "id": <span className="text-purple-300">{question.id}</span>,<br/>
                            <span className="ml-4">"question": <span className="text-yellow-300">"{question.question}"</span>,</span><br/>
                            <span className="ml-4">"studentAnswer": <span className="text-yellow-300">"{question.studentAnswer}"</span>,</span><br/>
                            <span className="ml-4">"correctAnswer": <span className="text-yellow-300">"{question.correctAnswer}"</span>,</span><br/>
                            <span className="ml-4">"isCorrect": <span className={question.isCorrect ? 'text-green-300' : 'text-red-300'}>{question.isCorrect ? 'true' : 'false'}</span>,</span><br/>
                            <span className="ml-4">"marks": <span className="text-blue-300">{question.marks}</span></span>
                          </div>
                          <div>
                            {index === scoringResults.questionWise.length - 1 ? "}" : "},"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>]</div>
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Scoring Process Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Validation Techniques</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Answer Matching Algorithm
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Case-insensitive Comparison
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Partial Credit Calculation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Confidence-based Scoring
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Output Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Question-wise Breakdown
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Total Score Calculation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Percentage Scoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Detailed Analytics Ready
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* agent 4 */}


    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 rounded-2xl">
              <HiOutlineDocumentReport className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Agent 4: Analytics Expert
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive student performance analysis and personalized learning insights
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Panel - Scoring Results JSON from Agent 3 */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200"
            animate={{ 
              x: processing && currentStep >= 1 ? 150 : 0,
              scale: processing && currentStep >= 1 ? 0.9 : 1
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Scoring Results (Agent 3 Output)
            </h3>
            
            <div className="bg-gray-800 rounded-lg p-4 text-left max-h-96 overflow-y-auto">
              <div className="text-blue-400 text-sm font-mono">
                <div>{"{"}</div>
                <div className="ml-4">
                  <div>"studentId": <span className="text-yellow-300">"{scoringResults.studentId}"</span>,</div>
                  <div>"totalScore": <span className="text-green-300">{scoringResults.totalScore}</span>,</div>
                  <div>"totalMarks": <span className="text-green-300">{scoringResults.totalMarks}</span>,</div>
                  <div>"percentage": <span className="text-green-300">{scoringResults.percentage}</span>,</div>
                  <div>"questionWise": [</div>
                  <div className="ml-4">
                    {scoringResults.questionWise.map((question, index) => (
                      <div key={question.id}>
                        {"{"}
                        <div className="ml-4">
                          "id": <span className="text-purple-300">{question.id}</span>,<br/>
                          <span className="ml-4">"question": <span className="text-yellow-300">"{question.question}"</span>,</span><br/>
                          <span className="ml-4">"studentAnswer": <span className="text-yellow-300">"{question.studentAnswer}"</span>,</span><br/>
                          <span className="ml-4">"correctAnswer": <span className="text-yellow-300">"{question.correctAnswer}"</span>,</span><br/>
                          <span className="ml-4">"isCorrect": <span className={question.isCorrect ? 'text-green-300' : 'text-red-300'}>{question.isCorrect ? 'true' : 'false'}</span>,</span><br/>
                          <span className="ml-4">"marks": <span className="text-blue-300">{question.marks}</span></span>
                        </div>
                        <div>
                          {index === scoringResults.questionWise.length - 1 ? "}" : "},"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>]</div>
                </div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Score Badge */}
            <motion.div
              className="mt-4 text-center"
              animate={{ scale: processing ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: processing ? Infinity : 0 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-300">
                <HiOutlineChartBar className="w-4 h-4" />
                Score: {scoringResults.totalScore}/{scoringResults.totalMarks} ({scoringResults.percentage}%)
              </span>
            </motion.div>
          </motion.div>

          {/* Center Panel - Analytics Engine */}
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-teal-200 w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Analytics Control</h3>
              
              <div className="space-y-4">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-teal-800 mb-2">Current Status</div>
                  <div className={`text-lg font-semibold ${
                    analyticsComplete ? 'text-green-600' : 
                    processing ? 'text-yellow-600' : 'text-teal-600'
                  }`}>
                    {analyticsComplete ? '✓ Analysis Complete' :
                     processing ? `🔄 ${getStepText(currentStep)}` : 
                     'Ready for Analysis'}
                  </div>
                </div>

                <Button
                  onClick={executeAnalytics}
                  disabled={processing || analyticsComplete}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 text-lg disabled:bg-gray-400"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineDocumentReport className="w-5 h-5 animate-pulse" />
                      Generating Report...
                    </div>
                  ) : analyticsComplete ? (
                    <div className="flex items-center gap-2">
                      <HiOutlineAcademicCap className="w-5 h-5" />
                      Analysis Complete
                    </div>
                  ) : (
                    "Execute Analytics Process"
                  )}
                </Button>

                {analyticsComplete && !showReport && (
                  <Button
                    onClick={viewReport}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg"
                  >
                    <div className="flex items-center gap-2">
                      <HiChevronDown className="w-5 h-5" />
                      View Comprehensive Report
                    </div>
                  </Button>
                )}

                {analyticsComplete && (
                  <Button
                    onClick={resetProcess}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Reset Process
                  </Button>
                )}
              </div>
            </div>

            {/* Analytics Engine Animation */}
            <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              
              {/* Data Flow Animation - JSONs moving towards each other */}
              <AnimatePresence>
                {processing && (
                  <>
                    {/* Left JSON moving right */}
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 80, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg rotate-12">
                        <HiOutlineChartBar className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Right JSON moving left */}
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: -80, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-lg -rotate-12">
                        <HiOutlineDocumentReport className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Central Mixing Animation */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                        <HiOutlineLightBulb className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Connection lines between JSONs and center */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-teal-400 rounded-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Processing Animation */}
              <AnimatePresence>
                {processing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center z-10"
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3"
                    />
                    <p className="text-teal-700 font-semibold">Analyzing Data</p>
                    <p className="text-teal-600 text-sm">
                      Step {currentStep} of 4
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Preview */}
              <AnimatePresence>
                {analyticsComplete && !showReport && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white p-4 rounded-lg shadow-lg border-2 border-green-200 z-10"
                  >
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      📊 Analysis Complete
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      Report Ready to View
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-4 gap-4 w-full">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`text-center p-3 rounded-lg transition-all duration-300 ${
                    currentStep >= step ? 
                    'bg-teal-100 border-2 border-teal-300 shadow-md' : 
                    'bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm text-gray-800">Step {step}</div>
                  <div className="text-xs text-gray-600">{getStepLabel(step)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Question Paper JSON */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200"
            animate={{ 
              x: processing && currentStep >= 1 ? -150 : 0,
              scale: processing && currentStep >= 1 ? 0.9 : 1
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Question Paper Metadata
            </h3>
            
            <div className="bg-gray-800 rounded-lg p-4 text-left max-h-96 overflow-y-auto">
              <div className="text-green-400 text-sm font-mono">
                <div>{"{"}</div>
                <div className="ml-4">
                  <div>"subject": <span className="text-yellow-300">"{questionPaper.subject}"</span>,</div>
                  <div>"examDate": <span className="text-yellow-300">"{questionPaper.examDate}"</span>,</div>
                  <div>"difficulty": <span className="text-yellow-300">"{questionPaper.difficulty}"</span>,</div>
                  <div>"timeAllowed": <span className="text-yellow-300">"{questionPaper.timeAllowed}"</span>,</div>
                  <div>"totalQuestions": <span className="text-blue-300">{questionPaper.totalQuestions}</span>,</div>
                  <div>"topics": [</div>
                  <div className="ml-4">
                    {questionPaper.topics.map((topic, index) => (
                      <div key={index}>
                        <span className="text-yellow-300">"{topic}"</span>
                        {index === questionPaper.topics.length - 1 ? "" : ","}
                      </div>
                    ))}
                  </div>
                  <div>]</div>
                </div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Subject Badge */}
            <motion.div
              className="mt-4 text-center"
              animate={{ scale: processing ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 1, repeat: processing ? Infinity : 0, delay: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-300">
                <HiOutlineAcademicCap className="w-4 h-4" />
                {questionPaper.subject}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Comprehensive Report Section */}
        <div ref={reportRef}>
          <AnimatePresence>
            {showReport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mt-8 bg-white rounded-2xl shadow-2xl p-8 border-2 border-teal-200"
              >
                {/* Formal Report Header */}
                <div className="text-center mb-8 border-b-2 border-teal-100 pb-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-2xl">
                      <HiOutlineAcademicCap className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Student Performance Analysis Report</h2>
                      <p className="text-gray-600">Comprehensive Academic Assessment</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analyticsReport.overallScore}%</div>
                      <div className="text-sm text-blue-700">Overall Score</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analyticsReport.grade}</div>
                      <div className="text-sm text-green-700">Grade</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{analyticsReport.comparativeAnalysis.percentile}%</div>
                      <div className="text-sm text-purple-700">Percentile Rank</div>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Student Information</h3>
                    <div className="space-y-3">
                      <InfoRow label="Student ID" value={analyticsReport.studentId} />
                      <InfoRow label="Student Name" value={analyticsReport.studentName} />
                      <InfoRow label="Subject" value={analyticsReport.subject} />
                      <InfoRow label="Exam Date" value={analyticsReport.examDate} />
                      <InfoRow label="Learning Style" value={analyticsReport.learningStyle} />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Performance Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{analyticsReport.performanceSummary}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-lg font-bold text-teal-600">{analyticsReport.comparativeAnalysis.classAverage}%</div>
                        <div className="text-xs text-gray-600">Class Average</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-lg font-bold text-teal-600">{analyticsReport.comparativeAnalysis.predictedPerformance}%</div>
                        <div className="text-xs text-gray-600">Predicted Performance</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis Sections */}
                <div className="space-y-8">
                  {/* Skills Assessment */}
                  <Section title="Skills Assessment" icon="📊">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(analyticsReport.performanceAnalysis).map(([skill, score]) => (
                        <div key={skill} className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-teal-200 transition-all">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-700 capitalize text-sm">
                              {skill.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-bold text-teal-600">{score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Section title="Key Strengths" icon="⭐">
                      <ul className="space-y-3">
                        {analyticsReport.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Areas for Improvement" icon="🎯">
                      <ul className="space-y-3">
                        {analyticsReport.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>
                  </div>

                  {/* Recommendations */}
                  <Section title="Personalized Recommendations" icon="💡">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analyticsReport.recommendations.map((recommendation, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border-2 border-purple-100 hover:border-purple-200 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {/* Study Plan */}
                  <Section title="Suggested Study Plan" icon="📚">
                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                      <ul className="space-y-2">
                        {analyticsReport.studyRecommendations.map((plan, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            {plan}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>
                </div>

                {/* Report Footer */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
                  <p className="text-gray-600 text-sm">
                    Report generated on {new Date().toLocaleDateString()} • Smart Answer Sheet Evaluation System
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    This report is generated based on comprehensive analysis of student performance data.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>


    </>
  );
}

/* --------------------- Helper Components & Functions --------------------- */

const Section = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100"
  >
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span>{icon}</span>
      {title}
    </h3>
    {children}
  </motion.div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const getStepText = (step) => {
  switch(step) {
    case 1: return "Collecting Data...";
    case 2: return "Processing Information...";
    case 3: return "Analyzing Patterns...";
    case 4: return "Generating Report...";
    default: return "Starting Analysis...";
  }
};

const getStepLabel = (step) => {
  switch(step) {
    case 1: return "Data Input";
    case 2: return "Processing";
    case 3: return "Analysis";
    case 4: return "Report";
    default: return "";
  }
};