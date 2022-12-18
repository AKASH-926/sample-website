import "./App.css";
import Login from "./login/login";
import Signup from "./signup/signup";
import Welcome from "./welcome page/Welcome_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected_Route from "./Protected Route/protected_route";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/*  eslint-disable-next-line */}
          <Route element={<Protected_Route />}>
            <Route path="/mypage" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
