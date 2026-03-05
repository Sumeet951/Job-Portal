
import "./App.css";
// import Navbar from "./components/shared/Navbar";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Jobs from "./Pages/Jobs";
import BrowsePage from "./Pages/BrowsePage";
import ProfilePage from "./Pages/ProfilePage";
import JobDescription from "./Pages/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./Pages/CompanyCreate";
import CompanySetup from "./Pages/CompanySetup";
import Adminjobs from "./Pages/Adminjobs";
import PostJob from "./Pages/PostJob";
import Applicants from "./Pages/Applicants";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/browser" element={<BrowsePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route
          path="/jobs/description/:id"
          element={<JobDescription />}
        ></Route>
        {/* Admin Routes */}
        <Route element={<RequireAuth allowedRoles={["recruiter"]} />}>
          <Route path="/admin/companies" element={<Companies />}></Route>
          <Route
            path="/admin/companies/create"
            element={<CompanyCreate />}
          ></Route>
          <Route path="/admin/companies/:id" element={<CompanySetup />}></Route>
          <Route path="/admin/jobs" element={<Adminjobs />}></Route>
          <Route path="/admin/jobs/post" element={<PostJob />}></Route>
          <Route
            path="/admin/jobs/:id/applicants"
            element={<Applicants />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
