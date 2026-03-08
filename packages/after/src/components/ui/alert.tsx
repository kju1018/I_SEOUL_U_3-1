import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex w-full items-start gap-2 rounded-[3px] border p-[10px_12px] text-sm [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-bg-strong border-neutral-border-strong text-neutral-text-body",
        destructive:
          "bg-danger-light border-danger-border text-danger-dark [&>svg]:text-danger-dark",
        success:
          "bg-success-light border-success-border text-success-dark [&>svg]:text-success-dark",
        warning:
          "bg-warning-light border-warning-border text-warning-dark [&>svg]:text-warning-dark",
        info: "bg-info-light border-info-border text-info-dark [&>svg]:text-info-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      style={{ fontFamily: "Arial, sans-serif" }}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-bold tracking-tight text-[15px] mb-1 leading-none",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-[14px] leading-[1.5]", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
