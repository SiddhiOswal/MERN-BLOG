import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-700 text-white p-4 shadow-md text-lg  md:text-2xl lg:text-3xl">
      <nav className="flex justify-center space-x-8 font-medium">
        <Link to="/"  className="hover:text-red-500">Home</Link>
        <Link to="/register" className="hover:text-red-500">Register</Link>
        <Link to="/create-post" className="hover:text-red-500">Create</Link>
        <Link to="/about" className="hover:text-red-500">About</Link>
        <Link to="/profile" className="hover:text-red-500">Profile</Link>
      </nav>
    </header>
  )
}

export default Header