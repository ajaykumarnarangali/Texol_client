import { Route, Routes } from "react-router-dom"

import MainLayout from "./Layouts/MainLayout"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Onboard from './pages/Onboard'
import Result from './pages/Result'

import ProtectedRoute from './route/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path='/home' element={<Home />} />
          <Route path='/result' element={<Result />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Onboard />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
