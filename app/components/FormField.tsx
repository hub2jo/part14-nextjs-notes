type FormFieldProps = React.ComponentProps<"input"> & { label: string }

const FormField = ({ label, className = "", ...props }: FormFieldProps) => {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </label>
  )
}

export default FormField