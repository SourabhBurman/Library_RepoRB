import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/ContextProvider";
import LoginSignupNavbar from "../Components/Comman/LoginSignupNavbar";
import { useQuery, gql } from "@apollo/client";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      prerequisites
      name
      id
      description
    }
  }
`;

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const { loading, error, data } = useQuery(GET_COURSES);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (loading) return; 
    if (error) return;
    if (data && data.courses) {
      setCourses(data.courses);
    }
  }, [loading, error, data]);

  return (
    <>
      <div className="sticky top-0 left-0">
        <LoginSignupNavbar text={" "} path={"/profile"} title={"My Profile"} />
      </div>
      <div className="w-full py-10 bg-gray-100">
        <div className="w-10/12 m-auto rounded-lg py-15 bg-white">
          <h2 className="text-center pb-16 pt-10 text-4xl font-semibold text-dark">
            Welcome to Dashboard
          </h2>
          <div className="px-4">
            <div className="flex gap-2 flex-col">
              {data &&
                data.courses &&
                data.courses.map(({ id, name, description, prerequisites }) => (
                  <div
                    className="bg-gray-100 p-3 rounded-md flex justify-between align-middle items-center"
                    key={id}
                  >
                    <div className="">
                      <p className="text-xl text-text-orange font-semibold">
                        {name}
                      </p>
                      <p className="text-sm font-normal">{description}</p>
                    </div>
                    <div>
                      <p>{`Prerequisites: ${prerequisites}`}</p>
                    </div>
                    <div>
                      <button className="py-2 px-5 bg-dark rounded-md text-light font-medium hover:text-white hover:bg-primary ">
                        Enroll now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
