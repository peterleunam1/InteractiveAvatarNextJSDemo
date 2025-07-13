"use client";

import {
  AvatarQuality,
  StreamingEvents,
  VoiceChatTransport,
  VoiceEmotion,
  StartAvatarRequest,
  STTProvider,
  ElevenLabsModel,
} from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { useMemoizedFn, useUnmount } from "ahooks";

import { Button } from "./Button";
import { AvatarConfig } from "./AvatarConfig";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { useVoiceChat } from "./logic/useVoiceChat";
import { StreamingAvatarProvider, StreamingAvatarSessionState } from "./logic";
import { LoadingIcon } from "./Icons";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { AVATARS } from "@/app/lib/constants";

const DEFAULT_CONFIG: StartAvatarRequest = {
  quality: AvatarQuality.Low,
  avatarName: AVATARS[0].avatar_id,
  knowledgeId: undefined,
  voice: {
    rate: 1.5,
    emotion: VoiceEmotion.EXCITED,
    model: ElevenLabsModel.eleven_flash_v2_5,
  },
  language: "en",
  voiceChatTransport: VoiceChatTransport.WEBSOCKET,
  sttSettings: {
    provider: STTProvider.DEEPGRAM,
  },
};

function InteractiveAvatar() {
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();
  const [config, setConfig] = useState<StartAvatarRequest>(DEFAULT_CONFIG);
  const mediaStream = useRef<HTMLVideoElement>(null);

  const fetchAccessToken = async () => {
    try {
      const response = await fetch("/api/get-access-token", { method: "POST" });
      return await response.text();
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  const startSessionV2 = useMemoizedFn(async (isVoiceChat: boolean) => {
    try {
      const newToken = await fetchAccessToken();
      const avatar = initAvatar(newToken);

      avatar.on(StreamingEvents.AVATAR_START_TALKING, console.log);
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, console.log);
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, console.log);
      avatar.on(StreamingEvents.STREAM_READY, console.log);
      avatar.on(StreamingEvents.USER_START, console.log);
      avatar.on(StreamingEvents.USER_STOP, console.log);
      avatar.on(StreamingEvents.USER_END_MESSAGE, console.log);
      avatar.on(StreamingEvents.USER_TALKING_MESSAGE, console.log);
      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, console.log);
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, console.log);

      await startAvatar(config);
      if (isVoiceChat) await startVoiceChat();
    } catch (error) {
      console.error("Error starting avatar session:", error);
    }
  });

  useUnmount(stopAvatar);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current?.play();
      };
    }
  }, [stream]);

  const containerClassName: string = `w-full mx-auto flex flex-col gap-6 text-white p-6 lg:p-0 ${
    sessionState === StreamingAvatarSessionState.CONNECTED
      ? "lg:flex-row items-start lg:my-12"
      : "max-w-6xl"
  }`;

  const wrapperClassName: string = `flex flex-col ${
    sessionState === StreamingAvatarSessionState.CONNECTED
      ? "w-full lg:w-[75%] gap-4 lg:gap-7"
      : "w-full"
  }`;

  return (
    <main className={containerClassName}>
      {/* Card principal */}
      {/* <section className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md transition-all"> */}
      {/* Video o configuración */}
      <div className={wrapperClassName}>
        <div className="relative w-full aspect-video flex items-center justify-center">
          {sessionState !== StreamingAvatarSessionState.INACTIVE ? (
            <AvatarVideo ref={mediaStream} />
          ) : (
            <AvatarConfig config={config} onConfigChange={setConfig} />
          )}
        </div>

        {/* Controles */}
        <div className={`flex items-center justify-end gap-4 w-full max-w-[945px] ${sessionState === StreamingAvatarSessionState.INACTIVE && 'lg:pb-9 mt-6 md:mt-0'}`}>
          {sessionState === StreamingAvatarSessionState.CONNECTED ? (
            <AvatarControls />
          ) : sessionState === StreamingAvatarSessionState.INACTIVE && (
            <>
              <Button onClick={() => startSessionV2(true)}>
                Start Voice Chat
              </Button>
              <Button onClick={() => startSessionV2(false)}>
              Start Text Chat
              </Button>
            </>
          )
        }
        </div>
      </div>
      {/* </section> */}

      {/* Mensajes de chat */}
      {sessionState === StreamingAvatarSessionState.CONNECTED && (
        <MessageHistory />
      )}
    </main>
  );
}

export default function InteractiveAvatarWrapper() {
  return (
    <StreamingAvatarProvider basePath={process.env.NEXT_PUBLIC_BASE_API_URL}>
      <InteractiveAvatar />
    </StreamingAvatarProvider>
  );
}
