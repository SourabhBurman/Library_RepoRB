import { Link } from "react-router-dom";

const LoginSignupNavbar = ({ text, path, title }) => {
  return (
    <header className="border-b-2 w-full py-4 bg-dark">
      <div className="w-10/12 m-auto">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <Link to={"/"}><h2 className="font-bold text-2xl text-white">EduHub</h2></Link>
          </div>
          <div className="text-right">
            <p className="text-white font-medium text-sm">
              {text}{" "}
              <span className="text-primary">
                <Link to={path}>{title}</Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginSignupNavbar;
