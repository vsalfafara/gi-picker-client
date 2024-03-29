import { Route, Routes } from "react-router-dom";
import routes from "./routes"
import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

function App() {
  const particlesInit = useCallback(async (engine: Engine) => await loadFull(engine), []);
  const particlesLoaded = useCallback(async (container: Container | undefined) => await console.log(container), []);
  return (
    <>
    <div className="min-h-screen w-screen flex overflow-auto bg-gray-900">
      <div className="fixed top-0 left-0 h-screen w-screen bg-bg bg-cover bg-center opacity-40 z-0"></div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            number: {
              value: 100,
            },
            color: {
              value: ["#31dec1", "#a37800", "#c336ff", "#53de35"]
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              },
              polygon: {
                nb_sides: 3
              },
            },
            opacity: {
              value: .7,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: .3,
                sync: false
              }
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 5,
                size_min: 0.1,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 4,
              direction: "top-left",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
            }
          },
          retina_detect: true
        }}
      />
      <div className="z-10 w-full flex flex-col">
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
