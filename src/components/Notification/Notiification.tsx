import { useContext } from "react"
import { Transition } from "@headlessui/react"
import NotifcationContext from "../../context/NotifcationContext"
import types from "./styles"
import { CheckCircle, ExclamationCircle, XCircle } from "../Icons/Icons"

type NotificationProps = {
  showNotification: boolean
  type: keyof typeof types
  message: string
  withIcon: boolean
}

const Notiification = () => {
  const {showNotification, type, message, withIcon}: NotificationProps = useContext(NotifcationContext)
  const style = `${types.init} ${types[type]}`

  const setIcon = () => {
    let icon = null
    
    if (withIcon) {
      switch(type) {
        case 'success':
          icon = <CheckCircle />
          break
        case 'warning':
          icon = <ExclamationCircle />
          break
        case 'danger':
          icon = <XCircle />
        default:
          break
      }
      return (
        <div className="mr-1 font-bold">
          {icon}
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Transition
        show={showNotification}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={style}>
          {setIcon()}
          <p>{message}</p>
        </div>
      </Transition>
    </>
  )
}

export default Notiification