import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Upload from "../components/Upload";
import Dashboard from "@/components/Dashboard";

export default function Teacher() {
  const [examName, setExamName] = useState("");
  const [savedExamName, setSavedExamName] = useState("");

  const handleSaveExam = () => {
    if (!examName.trim()) {
      alert("Please enter an exam name");
      return;
    }
    setSavedExamName(examName.trim());
    setExamName("");
  };

  const handleChangeExam = () => {
    setSavedExamName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-12 px-10">
    <div className="container mx-auto max-w-7xl space-y-12">

                {/* ======================= Header Section ======================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  {/* Left Text Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-8 text-left"
                  >
                    <Badge className="px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white border-0">
                      🎯 AI-Powered Evaluation System
                    </Badge>
        
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                      Teacher{" "}
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Portal
                      </span>
                    </h1>
        
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                      Upload question papers, answer keys, and student answer sheets for
                      intelligent AI evaluation. Experience seamless grading with
                      SangamAI's advanced assessment platform.
                    </p>
        
                    <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Secure Uploads</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>Instant Processing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full" />
                        <span>AI-Powered Analysis</span>
                      </div>
                    </div>
                  </motion.div>
        
                  {/* Right Image Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center lg:justify-end"
                  >
                    <div className="relative w-full max-w-xl">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-3xl shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent z-10 rounded-3xl" />
                        <img
                          src="../../public/teacher.jpg" 
                          alt="Teacher Dashboard - AI Evaluation Platform"
                          className="w-full h-96 object-cover rounded-3xl transition-transform duration-700 hover:scale-105"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <Dashboard />

        {/* Exam Creation Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-green-700">
                <ClipboardList className="w-6 h-6" />
                <span>Manage Exams</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!savedExamName ? (
                <>
                  <p className="text-gray-600">
                    Add a new test to start uploading question papers, answer keys, and student submissions.
                  </p>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter exam name (e.g., Physics Midterm)"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                    <Button
                      onClick={handleSaveExam}
                      className="rounded-xl bg-green-700 hover:bg-green-800 text-white shadow-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Test
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-gray-600 mb-1">Current Exam:</p>
                    <h2 className="text-xl font-semibold text-green-700">{savedExamName}</h2>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleChangeExam}
                    className="rounded-xl border-green-500 text-green-700 hover:bg-green-100"
                  >
                    Change Exam
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upload Section */}
        {savedExamName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Upload examName={savedExamName} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
