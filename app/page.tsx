"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
export default function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full lg:w-[1000px] flex flex-col items-start justify-start gap-5 mx-auto">
        <div className="w-full">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
