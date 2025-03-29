import { Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import MyData from "./components/cabinet/MyData";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { authUser } from "./features/user/userSlice";
import Cabinet from "./components/cabinet/AppBar";
import Register from "./components/authorisation/Register";
import Login from "./components/authorisation/Login";
import { getAllCompositions } from "./features/composition/compositionSlice";
import { getAllEvents } from "./features/events_feature/eventPlanSlice";

export const apiUrl = 'http://localhost:8080';

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authUser()).then(() => {
      dispatch(getAllCompositions())
    })
  }, [dispatch])

  return (
    <div className="">
      <Routes>
        <Route path="/registration" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
    </div>
  )
}

export default App
