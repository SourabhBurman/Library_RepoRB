import { useState, useContext } from "react";
import Inputbox from "../Components/FormComponets/Inputbox";
import LoginSignupNavbar from "../Components/Comman/LoginSignupNavbar";
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../Context/ContextProvider';
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
      createdAt
      email
      name
      role
      id
    }
  }
`;

const Login = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false)

  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const DATA = useContext(AuthContext);
  const {login} = DATA;
  const navigate = useNavigate();

  const checkLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      localStorage.setItem("accessToken",data.loginUser.accessToken)
      login(data.loginUser);
      navigate("/");
    } catch (error) {
      setIsError(true)
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <LoginSignupNavbar
        text={"Don't have an account? "}
        path={"/signup"}
        title={"Signup"}
      />
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <div className="w-8/12 shadow-xl rounded-lg bg-dark max-md:w-10/12">
          <div className="flex gap-4 shadow-md bg-dark">
            <div className="w-6/12 p-12 bg-light max-lg:w-full">
              <h2 className="font-bold text-4xl text-dark pb-6">
                Login
              </h2>
              <form onSubmit={checkLogin}>
                <Inputbox
                  label={"Email"}
                  value={email}
                  isRequired={true}
                  onChange={setEmail}
                  class={""}
                  type={"text"}
                />
                <Inputbox
                  label={"Password"}
                  isRequired={true}
                  value={password}
                  onChange={setPassword}
                  class={""}
                  type={"password"}
                />
                {isError? <p className="text-text-red">{error}</p> : ""}
                <button
                  className="bg-primary text-white w-full py-1.5 my-3 font-semibold rounded-sm hover:bg-secondry"
                  type="submit"
                >
                  Signup Now
                </button>
              </form>
            </div>
            <div className="w-6/12 p-12 text-left flex justify-between flex-col max-lg:hidden">
                <h1 className="text-3xl font-medium text-white">Login to your account</h1>
                <div className="py-5">
                  <h2 className="text-white font-medium text-xl py-3">Admin account details</h2>

                  <p  className="text-white font-normal text-sm">email : admin@eduhub.com</p>
                  <p className="text-white font-normal text-sm">password : @password</p>
                </div>
                <h2 className="text-text-orange">Frontend is not fully ready!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
