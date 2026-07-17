"use client";

import React from "react";
import Link from "next/link";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-unit-xl px-4 text-center max-w-md mx-auto">
      <div className="text-on-surface-variant/40 mb-unit-md">
        {icon || <Inbox className="w-12 h-12 stroke-[1.25]" />}
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-body-md text-on-surface-variant mb-unit-lg">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-8 py-3 rounded-DEFAULT hover:opacity-85 transition-opacity inline-block"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
