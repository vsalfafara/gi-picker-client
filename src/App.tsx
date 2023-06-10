import { Route, Routes } from "react-router-dom";
import routes from "./routes"
import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particleConfig from "@/data/particle"

function App() {
  const particlesInit = useCallback(async (engine: Engine) => await loadFull(engine), []);
  const particlesLoaded = useCallback(async (container: Container | undefined) => await console.log(container), []);
  return (
    <>
    <div className="min-h-screen w-screen flex overflow-auto bg-gray-900">
      <div className="fixed top-0 left-0 h-screen w-screen bg-bg bg-cover bg-center opacity-40 z-0"></div>
      <Particles
        id="tsparticles"
        className="z-10"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleConfig}
      />
      <div className="z-20 w-full flex flex-col">
        <div className="flex-grow">
          <Routes>
            {routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
          </Routes>
        </div>
        <div className="flex justify-between px-16 py-4 bg-gray-700">
          <p className="text-white font-light">Developed by <span className="font-semibold">v.rx</span></p>
          <div className="flex items-center">
            <p className="text-white font-light mr-4">Made with</p>
            <div className="flex gap-2">
              <a href="https://vitejs.dev" target="_blank"><img className="h-6 w-auto" src="assets/Footer/vite.webp"/></a>
              <a href="https://react.dev" target="_blank"><img className="h-6 w-auto" src="assets/Footer/react.webp"/></a>
              <a href="https://expressjs.com" target="_blank"><img className="h-6 w-auto" src="assets/Footer/node.webp"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
