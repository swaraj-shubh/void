import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Brain, 
  Award, 
  Bell, 
  LineChart, 
  Sparkles,
  Shield,
  Users,
  Clock,
  Target,
  Leaf,
  GraduationCap,
  BookOpen
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Evaluation",
      desc: "Automatically scans and grades handwritten answers with deep learning precision.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      desc: "Visualize class trends, identify weak questions, and measure true skill growth.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: Bell,
      title: "Parent Alerts",
      desc: "Instantly notifies parents about absences or performance drops.",
      gradient: "from-lime-500 to-green-500"
    },
    {
      icon: LineChart,
      title: "Insight Metrics",
      desc: "Tracks critical thinking, consistency, and improvement rate for every student.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Achievements & Rankings",
      desc: "Celebrates progress with badges, weekly rankings, and personalized feedback.",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: Users,
      title: "Admin Control",
      desc: "Full 'Kala Chittha' access — attendance, reports, and trends in one secure view.",
      gradient: "from-blue-500 to-cyan-500"
    }
  ]

  const stats = [
    { stat: "70%+", label: "Time Saved in Evaluation", icon: Clock },
    { stat: "5x", label: "Faster Feedback for Students", icon: Sparkles },
    { stat: "90%", label: "Accuracy in AI Grading", icon: Target }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      {/* Hero Section */}
      <section className="flex-1 flex items-center py-20 px-6 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              // viewport={{ once: true }}
              className="space-y-8 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                // viewport={{ once: true }}
              >
                <Badge className="px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white border-0">
                  🚀 AI-Powered Answer Sheet Correction
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                // viewport={{ once: true }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Smarter
                  </span>
                  <br />
                  <span className="text-gray-900">Evaluation,</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Brighter Futures
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                // viewport={{ once: true }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Transform exams into actionable insights with our AI-powered platform. 
                Automate grading, unlock deep analytics, and deliver personalized feedback 
                to make education truly intelligent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                // viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Button asChild size="lg" className="rounded-full px-8 text-lg h-12 shadow-lg bg-green-700 hover:bg-green-800">
                  <Link to="/dashboard">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Launch Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-lg h-12 border-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                // viewport={{ once: true }}
                className="flex flex-wrap items-center gap-6 mt-12 text-sm text-gray-500"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>500+ Schools Trust Us</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Place for Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              // viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
                  <img 
                    src="../../public/download.jpg"
                    alt="EduSage Platform" 
                    className="w-full h-auto rounded-3xl shadow-2xl"
                  />
            </motion.div>



            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-white/60">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="px-4 py-2 mb-4 text-sm font-semibold border-green-600 text-green-600">
              ✨ Why Choose EduSage
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Smart Evaluation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save time, provide insights, and transform educational assessment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-emerald-50 overflow-hidden border-l-4 border-l-green-500">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Educators Worldwide
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Real results that make a difference in classrooms every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="rounded-2xl border-0 bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold mb-2">{item.stat}</h3>
                    <p className="text-lg text-emerald-100">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 overflow-hidden border-l-4 border-l-green-500">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Our Vision
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  EduSage aims to become the <span className="font-bold text-gray-900">"Smart Brain behind every Exam"</span> —
                  making assessments not just about marks, but meaningful insights.  
                  We bridge AI, analytics, and empathy to create an ecosystem where
                  teachers save time, parents stay informed, and students truly grow.
                </p>
                <Button size="lg" className="rounded-full px-8 bg-green-700 hover:bg-green-800">
                  <Leaf className="w-5 h-5 mr-2" />
                  Join the Revolution
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg" />
            <span className="text-xl font-bold text-white">EduSage</span>
          </div>
          <p className="text-lg mb-6">
            Built with 💡 and AI by Team Innovators
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-sm mt-8">
            © {new Date().getFullYear()} EduSage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}