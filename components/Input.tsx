import React from "react";

interface InputProps {
  value: string | undefined | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  return (
    <input
      type="text"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={`w-full text-gray-900 text-sm bg-white border border-gray-300 rounded-lg py-2 px-3 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 ${props.className}`}
    />
  );
};
