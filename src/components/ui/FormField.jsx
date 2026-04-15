function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helpText,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ocean">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-ocean/30 bg-white px-3 py-2 text-sm text-ink outline-none transition focus-visible:ring-4 focus-visible:ring-sun/60"
      />
      {helpText ? <p className="text-xs text-ink/70">{helpText}</p> : null}
    </div>
  )
}

export default FormField
