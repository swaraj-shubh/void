import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          PES
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/auth" className="hover:text-gray-400">
            Auth
          </Link>
        </div>
      </div>
    </nav>
  );
}
