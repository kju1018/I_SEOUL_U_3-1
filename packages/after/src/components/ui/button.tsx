import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-[Arial,sans-serif] font-normal leading-[1.5] whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border border-transparent rounded-[3px]",
  {
    variants: {
      variant: {
        primary:
          "border border-brand-hover bg-brand-primary text-white hover:bg-brand-hover",
        secondary:
          "border border-neutral-border bg-neutral-primary text-neutral-dark hover:bg-neutral-hover",
        danger:
          "border border-danger-hover bg-danger-primary text-white hover:bg-danger-hover",
        success:
          "border border-success-hover bg-success-primary text-white hover:bg-success-hover",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px] h-auto has-[>svg]:px-2.5", // px-3 = 12px, py-1.5 = 6px
        md: "px-5 py-2.5 text-[14px] h-auto", // px-5 = 20px, py-2.5 = 10px
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
