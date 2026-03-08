import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-header-border bg-header-bg shadow-header">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-xl font-bold text-white">
            L
          </div>
          <div>
            <h1 className="m-0 text-[18px] font-bold leading-none text-text-primary">
              Hanghae Company
            </h1>
            <p className="m-0 mt-0.5 text-[11px] leading-none text-text-secondary">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">
              Demo User
            </div>
            <div className="text-xs text-text-secondary">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-base font-semibold text-brand-primary">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
