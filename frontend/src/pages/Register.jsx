import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    try {
      e.preventDefault();

      let data = new FormData();

      data.append("userName", userName);
      data.append("email", email);
      data.append("password", password);
      data.append("userImage", userImage);

      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        console.log("error while getting response");
        return;
      }

      const result = await res.json();
      alert("User Registered Successfully!");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      alert("User Registration Failed !!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <form
        className="bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 rounded-2xl 
        text-sm sm:text-base md:text-lg lg:text-3xl 
        w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
        onSubmit={handleForm}
      >
        <h2 className="font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          Registration
        </h2>

        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg  lg:text-xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg  lg:text-xl"
          required
        />

        <input
          type="file"
          name="userImage"
          accept="image/*"
          onChange={(e) => setUserImage(e.target.files[0])}
          className="w-full border rounded p-2 sm:p-3 md:p-4 text-sm sm:text-base  lg:text-xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 sm:py-2 md:py-3 
          rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Register
        </button>

        <h2 className=" text-base sm:text-lg md:text-xl lg:text-2xl">
          Already user?
        </h2>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-1 sm:py-2 md:py-3 
          rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
          onClick={()=>navigate("/sign-in")}
        >
          Sign In
        </button>



      </form>
    </div>
  );
}

export default Register;