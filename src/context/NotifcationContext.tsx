import { createContext, useState, useEffect } from "react"

const NotificationContext = createContext(null as any)
const notificationDelay = 5000

export const NotifcationProvider = ({children}: any) => {
  const [showNotification, setShowNotification] = useState(false)
  const [type, setType] = useState('primary')
  const [message, setMessage] = useState('')
  const [withIcon, setWithIcon] = useState(false)

  useEffect(() => {
    const time = setTimeout(() => {
      setShowNotification(false)
    }, notificationDelay)
    return () => clearTimeout(time)
  }, [showNotification])

  const notificationHandler = (args: {type: string, message: string, withIcon: boolean}) => {
    setType(args.type)
    setWithIcon(args.withIcon)
    setMessage(args.message)
    setShowNotification(true) 
  }

  return (
    <NotificationContext.Provider value={{ notificationHandler, showNotification, type, message, withIcon }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext