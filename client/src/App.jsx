import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import StoreProvider from "./context/StoreProvider";
import { Route, Routes } from "react-router-dom";
import ProtecttiveRoute from "./utils/ProtecttiveRoute";

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
          <Route path="/chatPage" element={
            <ProtecttiveRoute>
              <Chat/>
            </ProtecttiveRoute>}/>
      </Routes>
    </StoreProvider>
  );
}

export default App;
