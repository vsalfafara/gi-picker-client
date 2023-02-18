type CheckboxProps = {
  id: string
  name: string
  label: string
  value: string | number | undefined
  onChange: Function
  disabled: boolean
}

const Checkbox = ({id, name, label, value, onChange, disabled}: CheckboxProps) => {
  return (
    <div className="flex items-center m-2">
      <div className="flex items-center h-5">
        <input id={id} type="checkbox" value={value} name={name} onChange={(e) => onChange(e.target.value)} className="`w-4 h-4 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`" disabled={disabled}/>
      </div>
      <div className="ml-2 text-md">
        <label htmlFor={id} className={`font-medium ${disabled ? 'text-gray-400' : ''}`.trim()}>{label}</label>
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  id: '',
  name: '',
  label: '',
  value: '',
  disabled: false,
  onChange: (): void => {}
}

export default Checkbox