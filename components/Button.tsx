import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`
        bg-primary 
        text-white
        text-xs 
        lg:text-sm 
        px-6 
        py-2 
        rounded-lg 
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        h-fit 
        transition-all 
        duration-200 
        ease-in-out 
        hover:bg-primaryHover 
        active:scale-[0.98]
        ${className}
      `}
      onClick={props.disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
