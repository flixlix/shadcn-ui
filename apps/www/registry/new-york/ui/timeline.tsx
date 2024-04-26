import React from "react"
import { CheckIcon, CircleIcon, Cross1Icon } from "@radix-ui/react-icons"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const timelineVariants = cva("flex flex-col items-stretch", {
  variants: {
    positions: {
      left: "[&>li]:grid-cols-[0_min-content_1fr]",
      right: "[&>li]:grid-cols-[1fr_min-content]",
      center: "[&>li]:grid-cols-[1fr_min-content_1fr]",
    },
  },
  defaultVariants: {
    positions: "left",
  },
})

interface TimelineProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, className, positions, ...props }, ref) => {
    return (
      <ul
        className={cn(timelineVariants({ positions }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    )
  }
)
Timeline.displayName = "Timeline"

const timelineItemVariants = cva("grid items-center gap-x-2", {
  variants: {
    status: {
      done: "text-primary",
      default: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "default",
  },
})

interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status, ...props }, ref) => (
    <li
      className={cn(timelineItemVariants({ status }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineItem.displayName = "TimelineItem"

const timelineDotVariants = cva(
  "col-start-2 col-end-3 row-start-1 row-end-1 flex size-4 items-center justify-center rounded-full border border-current",
  {
    variants: {
      status: {
        default: "[&>*]:hidden",
        current:
          "[&>*:not(.radix-circle)]:hidden [&>.radix-circle]:bg-current [&>.radix-circle]:fill-current",
        done: "bg-primary [&>*:not(.radix-check)]:hidden [&>.radix-check]:text-background",
        error:
          "border-destructive bg-destructive [&>*:not(.radix-cross)]:hidden [&>.radix-cross]:text-background",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  customIcon?: React.ReactNode
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status, customIcon, ...props }, ref) => (
    <div
      role="status"
      className={cn("timeline-dot", timelineDotVariants({ status }), className)}
      ref={ref}
      {...props}
    >
      <div className="radix-circle size-2.5 rounded-full" />
      <CheckIcon className="radix-check size-3" />
      <Cross1Icon className="radix-cross size-2.5" />
      {customIcon}
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const timelineContentVariants = cva(
  "row-start-2 row-end-2 pb-8 text-muted-foreground",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface TimelineConent
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof timelineContentVariants> {}

const TimelineContent = React.forwardRef<HTMLParagraphElement, TimelineConent>(
  ({ className, side, ...props }, ref) => (
    <p
      className={cn(timelineContentVariants({ side }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineContent.displayName = "TimelineContent"

const timelineHeadingVariants = cva(
  "row-start-1 row-end-1 line-clamp-1 max-w-full truncate",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
      variant: {
        primary: "text-base font-medium text-primary",
        secondary: "text-sm font-light text-muted-foreground",
      },
    },
    defaultVariants: {
      side: "right",
      variant: "primary",
    },
  }
)

interface TimelineConent
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof timelineHeadingVariants> {}

const TimelineHeading = React.forwardRef<HTMLParagraphElement, TimelineConent>(
  ({ className, side, variant, ...props }, ref) => (
    <p
      role="heading"
      aria-level={variant === "primary" ? 2 : 3}
      className={cn(timelineHeadingVariants({ side, variant }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineHeading.displayName = "TimelineHeading"

interface TimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
  done?: boolean
}

const TimelineLine = React.forwardRef<HTMLHRElement, TimelineLineProps>(
  ({ className, done = false, ...props }, ref) => {
    return (
      <hr
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full",
          done ? "bg-primary" : "bg-muted",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TimelineLine.displayName = "TimelineLine"

export {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineHeading,
  TimelineLine,
}
