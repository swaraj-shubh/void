import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("role")
    setIsAuthenticated(!!token)
    setRole(userRole)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setIsAuthenticated(false)
    setRole(null)
    navigate("/")
  }

  const getLinkClass = (path) => {
    return `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-white/90 hover:text-white font-medium ${
      location.pathname === path ? "bg-white/20 text-white font-semibold shadow-inner" : ""
    }`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-green-700 to-emerald-800 shadow-lg border-b border-white/10 w-full sticky top-0 z-50 backdrop-blur-sm">
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-300"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <img src="/vite.png" alt="Logo" className="w-8 h-8 hover:scale-105 transition-transform" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white tracking-tight">sangamAi</h1>
            <Badge variant="secondary" className="text-xs px-1 py-0 h-4 bg-white/20 text-white/80 border-0">
              smartail
            </Badge>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex w-full">
          <NavigationMenuList className="flex gap-1 w-full items-center">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={getLinkClass("/")}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/playground" className={getLinkClass("/playground")}>
                  Playground
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/teacher" className={getLinkClass("/teacher")}>
                  Teacher
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <div className="ml-auto flex items-center gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/profile" className={getLinkClass("/profile")}>
                    Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {isAuthenticated ? (
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="bg-white text-green-800 font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg border-0 rounded-lg px-6"
                  >
                    Logout
                  </Button>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/auth" 
                      className={`${getLinkClass("/auth")} bg-white/20 hover:bg-white/30 border border-white/30 font-semibold`}
                    >
                      Login
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-b from-green-700 to-emerald-800 border-t border-white/10 shadow-2xl z-50 backdrop-blur-lg">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/"
                className={getLinkClass("/")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* <Link
                to="/image"
                className={getLinkClass("/image")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Image
              </Link> */}

              <Link
                to="/teacher"
                className={getLinkClass("/teacher")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Teacher
              </Link>

              <Link
                to="/profile"
                className={getLinkClass("/profile")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>

              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-white text-green-800 font-semibold hover:bg-gray-100 transition-all duration-300 mt-4 rounded-lg py-3"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/auth"
                  className={`${getLinkClass("/auth")} bg-white/20 border border-white/30 font-semibold text-center py-3 rounded-lg`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
