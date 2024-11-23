"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue = "",
  onBlur
}, ref) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
{label ? (<Label htmlFor={id} className="text-xs font-semibold text-neutral-700">{label}</Label>): null } 
        <Input
          id={id}
          name={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          onBlur={onBlur}
          className={`w-full p-2 border border-neutral-300 rounded-md focus:ring focus:ring-primary-500 focus:border-primary-500 ${className}`}
        />
      </div>
      <FormErrors
      id={id}
      errors={errors}
      />
    </div>
  )
});

FormInput.displayName = "FormInput";