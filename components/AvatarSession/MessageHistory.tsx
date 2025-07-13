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
      className="w-full lg:w-[295px] overflow-y-auto flex flex-col gap-2 text-gray-800 self-center bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 lg:h-[555px] mb-8"
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
            <p className="text-xs text-gray-400">
              {message.sender === MessageSender.AVATAR ? "Avatar" : "You"}
            </p>
            <p className="text-sm text-gray-800">{message.content}</p>
          </div>
        ))
      ) : (
        <span className="w-full lg:h-[550px] flex items-center justify-center">
          <p className="text-gray-500">No Message History</p>
        </span>
      )}
    </article>
  );
};
