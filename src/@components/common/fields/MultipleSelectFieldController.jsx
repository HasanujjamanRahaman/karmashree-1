// import { Option, Select } from '@material-tailwind/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

const MultipleSelectFieldController = ({ name, control, label, required, options = [], fullWidth = false, className = "" }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref }, fieldState }) => (
                <div className={`${!fullWidth && "min-w-[290px] max-w-[300px]"} flex flex-col ${className}`}>
                    <label className="mb-1 block font-medium text-black dark:text-white">
                        {label}{required && <span className='text-danger mx-1'>*</span>}
                    </label>

                    <Select
                        isMulti
                        ref={ref}
                        value={options.filter(option => value?.includes(option?.value))}
                        onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(option => option.value);
                            onChange(selectedValues);
                        }}
                        isClearable
                        options={options}
                    />

                    {fieldState?.error && <span className='text-danger'>{fieldState?.error?.message}</span>}
                </div>
            )}
        />
    )
}

export default MultipleSelectFieldController