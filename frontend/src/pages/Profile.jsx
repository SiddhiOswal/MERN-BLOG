import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  signOutSuccess,
  signOutFailure,
  userDeleteFailure,
  userDeleteSuccess
} from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";


function Profile() {
  const user = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState(null);
  const userData = user?.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserName(userData.userName);
      setEmail(userData.email);
      setUserImage(userData.userImage);
    }
  }, [userData]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST"
      });

      console.log("res", res);

      if(!res.ok){
        dispatch(signOutFailure("Sign out failed!!"));
        return;
      }
      alert("Sign-out successfull");
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      //Handle any unexpected error(network/server issue)
      dispatch(signOutFailure(error));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/user/delete-user", {
        method: "DELETE"
      });

      console.log("res", res);

      if(!res.ok){
        alert("User deletion failed!!");
        dispatch(userDeleteFailure("User detection failed!!"));
        return;
      }
      alert("User deleted successfully");
      dispatch(userDeleteSuccess());
      navigate("/");
    } catch (error) {
      //Handle any unexpected error(network/server issue)
      dispatch(userDeleteFailure(error));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-300 px-4">
      {userData ? (
        <div className="bg-cyan-400 rounded-2xl p-6 sm:p-10 w-full max-w-md text-center lg:w-160 lg:h-150">
          {/* User profile image */}
          <img
            src={userImage}
            alt={userName}
            className="w-50 h-50 sm:w-40 sm:h-40 lg:w-80 lg:h-80 rounded-full mx-auto mb-6 border-4 border-gray-200 object-cover"
          />
          {/* User name */}
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-2 border-1 p-1 rounded-2xl bg-white">
            {userName}
          </h1>
          {/* userEmail */}
          <p className="text-gray-600 text-base sm:text-lg break-words mb-6 lg:text-2xl border-1 p-2 rounded-2xl bg-white">
            {email}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              className="px-5 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          </div>
        </div>
      ) : (
        //loading state
        <p className="text-gray-500 text-lg">Loading profile...</p>
      )}
    </div>
  )
}

//Export Profile component
export default Profile