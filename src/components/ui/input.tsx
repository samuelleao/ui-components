import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { Button } from "./button";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type InputProps<T = HTMLInputElement | HTMLTextAreaElement> = React.HTMLProps<T> & {
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  helperText?: string;
  loading?: boolean
};

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    const id = React.useId();

    const [showPassoword, setShowPassword] = React.useState(false)

    return (
      <fieldset className={className}>
        {label && (
          <label
            htmlFor={id}
            className={`font-medium text-sm block mb-2 cursor-pointer ${error && "text-red-600"}`}
          >
            {label}
          </label>
        )}

        {type === "textarea" ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            className={`flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${error && `focus-visible:ring-red-600`}`}
            id={id}
          />
        ) : (
          <div className="relative">
            <input
              type={type === "password" ? showPassoword ? "text" : "password" : type}
              id={id}
              className={cn(
                ` flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:text-slate-950 dark:file:text-slate-50 file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${error && `focus-visible:ring-red-600`}`
              )}
              ref={ref as React.RefObject<HTMLInputElement>}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
            {type === "password" && (
              <Button type='button' variant="ghost" size="icon" onClick={() => setShowPassword(!showPassoword)} className={`text-slate-600 absolute right-2 bottom-1 w-7 h-7`}>
                {showPassoword ? <EyeNoneIcon /> : <EyeOpenIcon />}
              </Button>
            )}
          </div>
        )}
        {helperText && <p className="text-xs text-muted-foreground mt-2">{helperText}</p>}
        {error && <span className="text-red-600 block mt-2 text-sm">{`${error}`}</span>}
      </fieldset>
    );
  }
);

Input.displayName = "Input";

export { Input };
