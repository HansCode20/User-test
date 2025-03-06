import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Users from "./pages/Users"
import ProtectedRoute from "./components/ProtectedRoute"
import UsersDetail from "./pages/UsersDetail"
import UsersUpdate from "./pages/UsersUpdate"
import CreateUser from "./pages/CreateUser"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Users />} />
          <Route path ="/:userId" element={<UsersDetail />} />
          <Route path="/update/:userId" element={<UsersUpdate />} />
          <Route path="/createuser" element={<CreateUser />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;