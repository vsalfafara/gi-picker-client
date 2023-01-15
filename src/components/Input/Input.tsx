type InputProps = {
  type: string,
  name: string,
  value: string,
  placeholder: string,
  onChange: Function
}

const Input = ({type, name, value, placeholder, onChange}: InputProps) => {
  return (
    <input type={type} name={name} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
  )
}

Input.defaultProps = {
  type: 'text',
  name: '',
  value: '',
  placeholder: '',
  onChange: (): void => {}
}

export default Input
