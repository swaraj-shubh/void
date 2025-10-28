import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FileText, Key, Image as ImgIcon, Loader2, ChevronDown } from "lucide-react";

// Reusable image display component
const ImagePreview = ({ label, src, icon }) => (
  <div className="flex flex-col space-y-2 bg-green-50/40 p-3 rounded-xl border border-green-100">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium text-green-700">{label}</span>
    </div>
    <img
      src={src}
      alt={label}
      className="rounded-lg border border-green-100 shadow-sm w-full h-48 object-cover"
    />
  </div>
);

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-10 px-6">
      <div className="container mx-auto max-w-5xl space-y-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-green-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📚 All Submissions Dashboard
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No submissions found</p>
            <p className="text-sm text-gray-400">
              Start by uploading exam submissions to view them here.
            </p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {submissions.map((sub, index) => (
              <motion.div
                key={sub._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={sub._id}
                  className="rounded-2xl border border-green-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 flex justify-between items-center text-green-800 font-semibold text-lg">
                    <div className="flex flex-col items-start">
                      <span>{sub.examName || "Untitled Exam"}</span>
                      <Badge
                        variant="outline"
                        className="text-xs text-green-700 mt-1"
                      >
                        {new Date(sub.uploadedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <ChevronDown className="w-5 h-5 text-green-700 transition-transform duration-300" />
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="space-y-4 px-6 pb-6 pt-2">
                      <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
                        <ImagePreview
                            label="Question Paper"
                            src={sub.questionPaper}
                            icon={<ImgIcon className="w-4 h-4 text-green-600" />}
                        />
                        <ImagePreview
                            label="Answer Key"
                            src={sub.answerKey}
                            icon={<Key className="w-4 h-4 text-green-600" />}
                        />
                        {sub.studentAnswerSheet && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-green-700 mb-1">
                            📄 Answer Sheet (PDF)
                          </p>
                          <a
                            href={sub.studentAnswerSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 underline text-sm"
                          >
                            View / Download PDF
                          </a>
                        </div>
                      )}
                        </div>
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
