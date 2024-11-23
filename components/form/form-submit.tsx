// import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "primary";
};

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant
}: FormSubmitProps) => {
return (
  <Button
  disabled={disabled}
  type="submit"
  variant={variant}
  size="sm"
  className={cn(className)}
  >
    {children}
  </Button>
)
}