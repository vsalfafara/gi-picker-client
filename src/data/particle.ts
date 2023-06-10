const particleConfig = {
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
}

export default particleConfig