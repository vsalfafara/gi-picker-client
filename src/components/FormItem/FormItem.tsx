const labelPositions = {
  right: 'text-right',
  left: 'text-left',
  top: 'flex-col'
}

type FormItemProps = {
  label: null | string
  labelPosition: keyof typeof labelPositions
  labelWidth: null | string
  children: React.ReactNode
}

const FormItem = ({ label, labelPosition, labelWidth, children }: FormItemProps) => {
  const formItemClass = `flex ${labelPosition === 'top' ? 'items-start' : 'items-center'} ${labelPosition === 'top' ? labelPositions[labelPosition] : ''}`.trim()
  return (
    <div className="mb-4">
      <div className={formItemClass}>
        {(() => {
          if (label) {
            const labelClass = `${labelWidth} pr-4 ${labelPositions[labelPosition]}`.trim()
            return (
              <label className={labelClass} htmlFor={label}>{label}</label>
            )
          }
        })()}
        {children}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  label: null,
  labelPosition: 'right',
  labelWidth: 'w-[120px]',
  children: null
}

export default FormItem
