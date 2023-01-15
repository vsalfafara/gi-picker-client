type CardProps = {
  title: string | null
  children: React.ReactNode
  fullHeight: boolean
  className: string | null
}

const Card = ({ title, children, fullHeight, className }: CardProps) => {
  const cardClass = `border rounded-md border-gray-300 shadow-md bg-white ${fullHeight ? 'h-screen' : ''} ${className}`.trim()

  const cardTitle = () => {
    if (title) {
      return (
        <div className="p-5 border-b border-gray-300 font-bold">
          {title}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className={cardClass}>
      {cardTitle()}
      <div className="p-5 drop-shadow-none">
        {children}
      </div>
    </div>
  )
}

Card.defaultProps = {
  children: null,
  title: null,
  className: null,
  fullHeight: false
}

export default Card