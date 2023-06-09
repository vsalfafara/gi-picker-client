import { Route, Routes } from "react-router-dom";
import routes from "./routes"

function App() {
  return (
    <div className="min-h-screen w-screen flex overflow-auto bg-gray-900">
      <div className="fixed top-0 left-0 h-screen w-screen bg-bg bg-cover bg-center opacity-40 z-0"></div>
      <div className="z-10 w-full">
        <Routes>
          {routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
        </Routes>
      </div>
    </div>
  )
}

export default App
