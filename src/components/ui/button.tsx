import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const MAGNETIC_DISTANCE = 6; // Max pixels button can move

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 relative overflow-hidden active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "rounded-[16px] bg-gradient-primary text-white shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_2px_0_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.2),0_0_20px_rgba(76,175,80,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110 active:shadow-[0_1px_0_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]",
        destructive: "rounded-[16px] bg-destructive text-destructive-foreground shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)] hover:bg-destructive/90 hover:shadow-[0_2px_0_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.2)] active:shadow-[0_1px_0_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.15)]",
        outline: "rounded-[16px] border-2 border-primary bg-background text-primary shadow-[0_2px_0_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary hover:text-primary-foreground hover:shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.12)] active:shadow-[0_1px_0_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.1)]",
        secondary: "rounded-[16px] bg-gradient-secondary text-white shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_2px_0_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.2),0_0_20px_rgba(33,150,243,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110 active:shadow-[0_1px_0_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]",
        glass: "rounded-[20px] bg-background/60 backdrop-blur-md text-foreground border-[2px] border-transparent shadow-[0_2px_0_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_0_rgba(0,0,0,0.1),0_6px_24px_rgba(0,0,0,0.15),0_0_24px_rgba(76,175,80,0.2)] active:shadow-[0_1px_0_rgba(0,0,0,0.1),0_2px_12px_rgba(0,0,0,0.12)] [background-image:linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--secondary))_100%)] [background-origin:border-box] [background-clip:padding-box,border-box]",
        tonal: "rounded-[14px] bg-primary/10 text-primary shadow-[0_1px_0_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.06),inset_0_-1px_0_hsl(var(--primary)/0.2)] hover:bg-primary/15 hover:shadow-[0_1px_0_rgba(0,0,0,0.05),0_3px_10px_rgba(0,0,0,0.08),inset_0_-1px_0_hsl(var(--primary)/0.3)] active:shadow-[0_1px_0_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.06),inset_0_-1px_0_hsl(var(--primary)/0.15)]",
        ghost: "rounded-[12px] hover:bg-muted hover:text-foreground hover:shadow-[0_1px_0_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.06)]",
        link: "text-primary underline-offset-4 hover:underline",
        soft: "rounded-[14px] bg-muted text-foreground shadow-[0_1px_0_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.05)] hover:bg-muted/80 hover:shadow-[0_1px_0_rgba(0,0,0,0.05),0_3px_10px_rgba(0,0,0,0.08)]",
      },
      size: {
        default: "min-h-[44px] px-6 py-3 text-base",
        sm: "min-h-[40px] px-4 py-2 text-sm",
        lg: "min-h-[48px] px-8 py-4 text-lg",
        icon: "min-h-[44px] min-w-[44px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const [magneticStyle, setMagneticStyle] = React.useState({});
    const [spotlightStyle, setSpotlightStyle] = React.useState({});
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const isMagnetic = variant !== "destructive" && !props.disabled && !asChild;

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isMagnetic || window.innerWidth < 768) return;
      
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const factor = Math.min(distance / maxDistance, 1);

      const translateX = (x / maxDistance) * MAGNETIC_DISTANCE * (1 - factor);
      const translateY = (y / maxDistance) * MAGNETIC_DISTANCE * (1 - factor);

      setMagneticStyle({
        transform: `translate(${translateX}px, ${translateY}px)`,
      });

      setSpotlightStyle({
        background: `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.2), transparent 65%)`,
      });
    };

    const handleMouseLeave = () => {
      setMagneticStyle({});
      setSpotlightStyle({});
    };

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const Comp = asChild ? Slot : "button";
    
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={buttonRef} {...props} />
      );
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        style={magneticStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {isMagnetic && <span className="absolute inset-0 pointer-events-none transition-all duration-150" style={spotlightStyle} />}
        {props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
