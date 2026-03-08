import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "flex flex-col rounded-[4px] mb-4 overflow-hidden bg-white font-['Roboto','Helvetica','Arial',sans-serif]",
  {
    variants: {
      variant: {
        default: "border border-[rgba(0,0,0,0.12)] shadow-card-default",
        bordered: "border border-[rgba(0,0,0,0.12)] shadow-none",
        elevated: "border border-[rgba(0,0,0,0.08)] shadow-card-elevated",
        flat: "border border-[rgba(0,0,0,0.08)] bg-neutral-bg-flat shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CardProps
  extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex justify-between items-center p-5 border-b border-[rgba(0,0,0,0.08)] bg-neutral-bg-flat",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "m-0 text-[1.125rem] font-medium leading-[1.6] text-[rgba(0,0,0,0.87)]",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "mt-1 text-[0.875rem] font-normal leading-[1.43] text-[rgba(0,0,0,0.6)]",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-5", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-5 pb-5", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
