import { Route, Routes } from "react-router-dom"

import MainLayout from "./Layouts/MainLayout"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Onboard from './pages/Onboard'
import Result from './pages/Result'

import ProtectedRoute from './route/ProtectedRoute'
import PublicRoute from "./route/PublicRoute"

function App() {

  return (
    <>
      <Routes>
        {/* if people logged in no need to goto this*/}
        <Route element={<PublicRoute>
          <MainLayout />
        </PublicRoute>}>
          <Route index element={<Onboard />} />
          <Route path='sign-up' element={<Register />} />
          <Route path='sign-in' element={<Login />} />
        </Route>

        {/* protected route for authenticated people*/}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path='home' element={<Home />} />
          <Route path='result' element={<Result />} />
        </Route>

        {/* accessing non existing route*/}
        <Route element={<MainLayout />}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
