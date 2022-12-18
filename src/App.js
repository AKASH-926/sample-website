import "./App.css";
import Login from "./login/login";
import Signup from "./signup/signup";
import Welcome from "./welcome page/Welcome_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/mypage" element={<Welcome />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
