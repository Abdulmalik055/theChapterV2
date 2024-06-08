import { Routes, Route } from "react-router-dom";
import "./App.css";
import Form from './components/Form'
import AllForm from "./components/AllForm";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Form/>}></Route>
        <Route path="/allData" element={<AllForm/>}></Route>
      </Routes>
    </>
  );
}

export default App;
