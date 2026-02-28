import { ShoppingCart, Home, Menu, Phone, HelpCircle, UtensilsCrossed, User, LogOut, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleProtectedAction = (path) => {
    if (!user) {
      navigate("/Login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-gradient-to-r from-amber-50 via-amber-100 to-white backdrop-blur-md border-b border-amber-500/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Navbar Header - Logo and Toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-900 drop-shadow-lg">
            🍴 Golden Essence
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-600 transition"
                >
                  <Home size={20} /> <span className="hidden lg:inline">Home</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleProtectedAction("/Menu1")}
                  className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-600 transition"
                >
                  <Menu size={20} /> <span className="hidden lg:inline">Menu</span>
                </button>
              </li>
              <li>
                <a
                  href="#interiors"
                  className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-600 transition"
                >
                  <HelpCircle size={20} /> <span className="hidden lg:inline">Interiors</span>
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-600 transition"
                >
                  <UtensilsCrossed size={20} />{' '}
                  <span className="hidden lg:inline">Book</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-600 transition"
                >
                  <Phone size={20} />{' '}
                  <span className="hidden lg:inline">Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleProtectedAction("/Cart")}
              className="relative cursor-pointer text-amber-900 hover:text-amber-600 transition"
            >
              <ShoppingCart size={24} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative cursor-pointer text-amber-900 hover:text-amber-600 transition"
                >
                  <User size={24} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-sm">{user.username}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <Link to="/UserDash">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-red-600 hover:bg-red-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/Login">
                  <button className="bg-amber-900 hover:bg-amber-950 text-white px-4 py-2 rounded-lg transition">
                    Login
                  </button>
                </Link>
                <Link to="/Signup">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => handleProtectedAction("/Cart")}
              className="text-amber-900 hover:text-amber-600 transition"
            >
              <ShoppingCart size={22} />
            </button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="text-amber-900 hover:text-amber-600 transition p-2 hover:bg-black/10 rounded-lg"
            >
              {mobileNavOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileNavOpen && (
          <div className="md:hidden mt-4 pb-6 border-t border-amber-600/30 pt-6 animate-in fade-in slide-in-from-top-2">
            {/* Mobile Navigation Links */}
            <ul className="space-y-1 mb-6">
              <li>
                <a
                  href="#home"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition"
                >
                  <Home size={20} /> Home
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleProtectedAction("/Menu1");
                    setMobileNavOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition text-left"
                >
                  <Menu size={20} /> Menu
                </button>
              </li>
              <li>
                <a
                  href="#interiors"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition"
                >
                  <HelpCircle size={20} /> Interiors
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition"
                >
                  <UtensilsCrossed size={20} /> Book
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition"
                >
                  <Phone size={20} /> Contact
                </a>
              </li>
            </ul>

            {/* Mobile Divider */}
            <div className="h-px bg-amber-600/30 my-4"></div>

            {/* Mobile User Section */}
            {user ? (
              <div className="space-y-2">
                <div className="bg-amber-600/10 p-3 rounded-lg mb-3">
                  <p className="text-amber-900 font-semibold text-sm">{user.username}</p>
                  <p className="text-amber-700 text-xs">{user.email}</p>
                </div>
                <Link to="/UserDash" onClick={() => setMobileNavOpen(false)}>
                  <button className="w-full flex items-center gap-3 text-amber-900 font-medium hover:bg-black/10 p-3 rounded-lg transition text-left">
                    <User size={20} /> Profile
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMobileNavOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-red-600 font-medium hover:bg-red-500/10 p-3 rounded-lg transition text-left"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/Login" onClick={() => setMobileNavOpen(false)}>
                  <button className="w-full bg-amber-900 hover:bg-amber-950 text-white px-4 py-2 rounded-lg transition">
                    Login
                  </button>
                </Link>
                <Link to="/Signup" onClick={() => setMobileNavOpen(false)}>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
