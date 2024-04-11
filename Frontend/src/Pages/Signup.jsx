import { useState, useContext } from "react";
import Inputbox from "../Components/FormComponets/Inputbox";
import LoginSignupNavbar from "../Components/Comman/LoginSignupNavbar";
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../Context/ContextProvider';
import { useNavigate } from "react-router-dom";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!, $role: String!) {
    createUser(email: $email, name: $name, password: $password, role: $role) {
      accessToken
      createdAt
      email
      name
      role
      id
    }
  }
`;


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const [createUser, { data }] = useMutation(CREATE_USER);
  const DATA = useContext(AuthContext);
  const {login} = DATA;
  const navigate = useNavigate();

  const regsiterUser = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({ variables: { email, name, password, role: "Student" } });
      setAccountCreated(true);
      setTimeout(()=>{
        navigate("/login");
      },2000)
    } catch (error) {
      setIsError(true)
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <LoginSignupNavbar
        text={"Already have an account? "}
        path={"/login"}
        title={"Login"}
      />
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <div className="w-8/12 shadow-xl rounded-lg bg-dark max-md:w-10/12">
          <div className="flex gap-4 shadow-md bg-dark">
            <div className="w-6/12 p-12 flex items-center justify-start max-lg:hidden">
                <h1 className="text-5xl leading-snug text-white w-4/12">Let's setup your free account</h1>
            </div>
            <div className="w-6/12 p-12 bg-light max-lg:w-full">
              <h2 className="font-bold text-4xl text-dark pb-6">
                Create account
              </h2>
              <form onSubmit={regsiterUser}>
                <Inputbox
                  label={"Email"}
                  value={email}
                  isRequired={true}
                  onChange={setEmail}
                  class={""}
                  type={"text"}
                />
                <Inputbox
                  label={"Name"}
                  type={"text"}
                  isRequired={true}
                  value={name}
                  onChange={setName}
                  class={""}
                />
                <Inputbox
                  label={"Password"}
                  isRequired={true}
                  value={password}
                  onChange={setPassword}
                  class={""}
                  type={"password"}
                />
                {isError? <h2 className="text-text-red">{error}</h2> :" "}
                {accountCreated? <h2 className="text-text-green">Your account created!</h2>: ""}
                <button
                  className="bg-primary text-white w-full py-1.5 my-3 font-semibold rounded-sm hover:bg-secondry"
                  type="submit"
                >
                  Signup Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
