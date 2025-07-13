import React, { forwardRef } from "react";
import { ConnectionQuality } from "@heygen/streaming-avatar";

import { useConnectionQuality } from "../logic/useConnectionQuality";
import { useStreamingAvatarSession } from "../logic/useStreamingAvatarSession";
import { StreamingAvatarSessionState } from "../logic";
import { CloseIcon, LoadingIcon } from "../Icons";
import { Button } from "../Button";

export const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState, stopAvatar } = useStreamingAvatarSession();
  const { connectionQuality } = useConnectionQuality();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  return (
    <>
      {connectionQuality !== ConnectionQuality.UNKNOWN && (
        <div className="absolute top-3 left-3 bg-white/90 text-gray-800 border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
          Connection Quality: {connectionQuality}
        </div>
      )}
      {isLoaded && (
        <Button
          className="absolute top-3 right-3 !p-2 bg-transparent border border-none hover:bg-gray-100/50 transition-colors shadow-sm z-10"
          onClick={stopAvatar}
        >
          <CloseIcon className="text-gray-600" />
        </Button>
      )}
      <video
        ref={ref}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "14px",
        }}
      >
        <track kind="captions" />
      </video>
      {!isLoaded && (
        <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 ">
          <LoadingIcon className="text-indigo-500" />
          <p className="mt-2 text-textColor">Loading</p>
        </div>
      )}
    </>
  );
});
AvatarVideo.displayName = "AvatarVideo";
