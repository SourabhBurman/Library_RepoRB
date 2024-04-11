import './App.css'
import AllRoutes from './Routes/AllRoutes'
// import { gql, useQuery} from "@apollo/client"

// const qurey = gql`
//   query GetLocations {
//     courses {
//       description
//       name
//       prerequisites
//       createdAt
//     }
//   }
// `;

function App() {
  // const {data, loading} = useQuery(qurey)
  return <div>
    {/* <h1>{JSON.stringify(data)}</h1> */}
     <AllRoutes/>
  </div>
}

export default App
