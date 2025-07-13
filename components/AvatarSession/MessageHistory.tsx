import React, { useEffect, useRef } from "react";

import { useMessageHistory, MessageSender } from "../logic";

export const MessageHistory: React.FC = () => {
  const { messages } = useMessageHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <article
      ref={containerRef}
      className="w-full lg:w-[295px] overflow-y-auto flex flex-col gap-2 text-white self-center bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 shadow-md hover:shadow-indigo-500/10 transition-shadow duration-300 h-[550px] mb-8"
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col gap-1 max-w-[350px] ${
              message.sender === MessageSender.CLIENT
                ? "self-end items-end"
                : "self-start items-start"
            }`}
          >
            <p className="text-xs text-zinc-400">
              {message.sender === MessageSender.AVATAR ? "Avatar" : "You"}
            </p>
            <p className="text-sm">{message.content}</p>
          </div>
        ))
      ) : (
        <span className="w-full h-[505px] flex items-center justify-center">
          <p>No history</p>
        </span>
      )}
    </article>
  );
};
