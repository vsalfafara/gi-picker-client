import { types, sizes } from "./styles"

type ButtonProps = {
  type: keyof typeof types
  size: keyof typeof sizes
  block: boolean;
  children: React.ReactNode
  onClick: Function
  disabled: boolean
}

const Button = ({ type, size, block, children, onClick, disabled }: ButtonProps) => {
  const className = `${types.init} ${types[type]} ${sizes[size]} ${block ? 'w-full' : ''}`.trim()
  const disabledStyle =  disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button type="button" className={className + ' ' + disabledStyle} onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'primary',
  size: 'md',
  block: false,
  children: 'Button',
  disabled: false,
  onClick: () => { return }
}

export default Button