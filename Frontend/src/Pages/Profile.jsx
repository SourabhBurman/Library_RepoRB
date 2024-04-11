import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import LoginSignupNavbar from "../Components/Comman/LoginSignupNavbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authStatus, userData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutuser = ()=>{
    logout();
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <div className="sticky top-0 left-0">
        <LoginSignupNavbar text={" "} path={"/profile"} title={"My Profile"} />
      </div>
      <div className="w-full h-screen py-10 bg-gray-100">
        <div className="w-10/12 m-auto rounded-lg py-10 bg-white">
        <h2 className="text-center pb-8 text-4xl font-semibold text-dark">Your Profile</h2>
        <div className="w-4/12 m-auto">
           {authStatus && userData && (
            <div className=" bg-gray-100 p-4 pt-6 rounded-md">
              <p className="text-xl text-black font-semibold">{`Name: ${userData.name}`}</p>
              <p className="text-xl text-black font-semibold">{`Email: ${userData.email}`}</p>
              <p  className="text-base text-text-green font-semibold">{`Role: ${userData.role}`}</p>
              <button className="w-full bg-dark font-medium text-text-orange py-1.5 mt-4 rounded hover:text-white" onClick={logoutuser}>Logout</button>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
