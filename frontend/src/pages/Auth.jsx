import React, { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { UserPlus, LogIn, GraduationCap } from "lucide-react";

const Auth = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRoleChange = (role) => setForm({ ...form, role });

  // ✅ Signup Handler
  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      alert(res.data.message);
      setActiveTab("login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login Handler
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
        role: form.role,
      });
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/"; // redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sangam<span className="text-green-700">AI</span> Portal
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">Empowering Smart Evaluation</p>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-full bg-green-100 p-1 mb-6">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full transition-all"
                >
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full transition-all"
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Signup
                </TabsTrigger>
              </TabsList>

              {/* ================= LOGIN ================= */}
              <TabsContent value="login">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-xl border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className="rounded-xl border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />

                    <Select onValueChange={handleRoleChange} value={form.role}>
                      <SelectTrigger className="rounded-xl border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🎓 Student</SelectItem>
                        <SelectItem value="parent">👨‍👩‍👧 Parent</SelectItem>
                        <SelectItem value="teacher">🧑‍🏫 Teacher</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full rounded-full bg-green-700 hover:bg-green-800 py-5 text-lg font-semibold transition-all"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              {/* ================= SIGNUP ================= */}
              <TabsContent value="signup">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-xl border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-xl border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className="rounded-xl border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />

                    <Select onValueChange={handleRoleChange} value={form.role}>
                      <SelectTrigger className="rounded-xl border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🎓 Student</SelectItem>
                        <SelectItem value="parent">👨‍👩‍👧 Parent</SelectItem>
                        <SelectItem value="teacher">🧑‍🏫 Teacher</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={handleSignup}
                      disabled={loading}
                      className="w-full rounded-full bg-green-700 hover:bg-green-800 py-5 text-lg font-semibold transition-all"
                    >
                      {loading ? "Signing up..." : "Signup"}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
