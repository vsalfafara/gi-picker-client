type RadioProps = {
  id: string
  name: string
  label: string
  value: string | number | undefined
  onChange: Function
  disabled: boolean
}

const Radio = ({id, name, label, value, onChange, disabled}: RadioProps) => {
  return (
    <div className="flex items-center mr-4">
      <div className="flex items-center h-5">
        <input id={id} type="radio" value={value} name={name} onChange={(e) => onChange(e.target.value)} className="`w-4 h-4 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`" disabled={disabled}/>
      </div>
      <div className="ml-2 text-md">
        <label htmlFor={id} className={`font-medium ${disabled ? 'text-gray-400' : ''}`.trim()}>{label}</label>
      </div>
    </div>
  )
}

Radio.defaultProps = {
  id: '',
  name: '',
  label: '',
  value: '',
  disabled: false,
  onChange: (): void => {}
}

export default Radio