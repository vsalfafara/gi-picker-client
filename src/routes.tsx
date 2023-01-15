import Home from "./views/Home/Home";
import Room from "./views/Room/Room";
import Game from "./views/Game/Game";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:roomId",
    element: <Home />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]

export default routes