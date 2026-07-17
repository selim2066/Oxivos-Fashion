import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/95",
        outline:
          "border-outline-variant bg-transparent text-primary hover:bg-surface-container-low hover:text-primary",
        secondary:
          "bg-secondary text-white hover:bg-secondary/95",
        glass:
          "bg-white/95 dark:bg-surface-container-lowest/95 backdrop-blur text-primary hover:bg-white dark:hover:bg-surface-container-lowest transition-all border border-outline-variant/10 font-label-md text-label-md uppercase tracking-wider font-semibold",
        ghost:
          "hover:bg-surface-container-low hover:text-primary",
        destructive:
          "bg-error text-white hover:bg-error/95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 text-label-md font-semibold tracking-wider uppercase",
        xs: "h-7 gap-1 rounded px-2.5 text-xs in-data-[slot=button-group]:rounded has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1 rounded px-3 text-[0.8rem] in-data-[slot=button-group]:rounded has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 text-label-md font-semibold tracking-wider uppercase",
        xl: "h-13 gap-2 px-7 text-label-md font-semibold tracking-wider uppercase [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 rounded",
        "icon-xs":
          "size-7 rounded in-data-[slot=button-group]:rounded [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8.5 rounded in-data-[slot=button-group]:rounded",
        "icon-lg": "size-11 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
