"use client";

import React, { useMemo } from "react";
import {
  AvatarQuality,
  ElevenLabsModel,
  STTProvider,
  VoiceEmotion,
  StartAvatarRequest,
  VoiceChatTransport,
} from "@heygen/streaming-avatar";

import { Input } from "../Input";
import { Select } from "../Select";
import { Field } from "./Field";
import { Card } from "../Card";
import { AVATARS, STT_LANGUAGE_LIST } from "@/app/lib/constants";

interface AvatarConfigProps {
  onConfigChange: (config: StartAvatarRequest) => void;
  config: StartAvatarRequest;
}

export const AvatarConfig: React.FC<AvatarConfigProps> = ({
  onConfigChange,
  config,
}) => {
  const onChange = <T extends keyof StartAvatarRequest>(
    key: T,
    value: StartAvatarRequest[T]
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  const selectedAvatar = useMemo(() => {
    const avatar = AVATARS.find((a) => a.avatar_id === config.avatarName);
    return avatar
      ? { isCustom: false, name: avatar.name, avatarId: avatar.avatar_id }
      : { isCustom: true, name: "Custom Avatar ID", avatarId: null };
  }, [config.avatarName]);

  return (
    <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
      {/* AVATAR SETTINGS */}
      <Card title="🧑 Avatar Settings">
        <Field label="Custom Knowledge Base ID">
          <Input
            placeholder="Enter custom knowledge base ID"
            value={config.knowledgeId}
            onChange={(value) => onChange("knowledgeId", value)}
          />
        </Field>
        <Field label="Avatar ID">
          <Select
            isSelected={(option) =>
              typeof option === "string"
                ? !!selectedAvatar.isCustom
                : option.avatar_id === selectedAvatar.avatarId
            }
            options={[...AVATARS, "CUSTOM"]}
            placeholder="Select Avatar"
            renderOption={(option) =>
              typeof option === "string" ? "Custom Avatar ID" : option.name
            }
            value={
              selectedAvatar.isCustom
                ? "Custom Avatar ID"
                : selectedAvatar.name
            }
            onSelect={(option) => {
              onChange("avatarName", typeof option === "string" ? "" : option.avatar_id);
            }}
          />
        </Field>
        {selectedAvatar.isCustom && (
          <Field label="Custom Avatar ID">
            <Input
              placeholder="Enter custom avatar ID"
              value={config.avatarName}
              onChange={(value) => onChange("avatarName", value)}
            />
          </Field>
        )}
        <Field label="Language">
          <Select
            isSelected={(option) => option.value === config.language}
            options={STT_LANGUAGE_LIST}
            renderOption={(option) => option.label}
            value={
              STT_LANGUAGE_LIST.find((o) => o.value === config.language)?.label
            }
            onSelect={(option) => onChange("language", option.value)}
          />
        </Field>
        <Field label="Avatar Quality">
          <Select
            isSelected={(option) => option === config.quality}
            options={Object.values(AvatarQuality)}
            renderOption={(option) => option}
            value={config.quality}
            onSelect={(option) => onChange("quality", option)}
          />
        </Field>
        <Field label="Voice Chat Transport">
          <Select
            isSelected={(option) => option === config.voiceChatTransport}
            options={Object.values(VoiceChatTransport)}
            renderOption={(option) => option}
            value={config.voiceChatTransport}
            onSelect={(option) => onChange("voiceChatTransport", option)}
          />
        </Field>
      </Card>

      {/* VOICE & STT SETTINGS */}
      <div className="flex flex-col gap-6">
        <Card title="🔊 Voice Settings">
          <Field label="Custom Voice ID">
            <Input
              placeholder="Enter custom voice ID"
              value={config.voice?.voiceId}
              onChange={(value) =>
                onChange("voice", { ...config.voice, voiceId: value })
              }
            />
          </Field>
          <Field label="Emotion">
            <Select
              isSelected={(option) => option === config.voice?.emotion}
              options={Object.values(VoiceEmotion)}
              renderOption={(option) => option}
              value={config.voice?.emotion}
              onSelect={(option) =>
                onChange("voice", { ...config.voice, emotion: option })
              }
            />
          </Field>
          <Field label="ElevenLabs Model">
            <Select
              isSelected={(option) => option === config.voice?.model}
              options={Object.values(ElevenLabsModel)}
              renderOption={(option) => option}
              value={config.voice?.model}
              onSelect={(option) =>
                onChange("voice", { ...config.voice, model: option })
              }
            />
          </Field>
        </Card>

        <Card title="🧠 STT Settings">
          <Field label="Provider">
            <Select
              isSelected={(option) => option === config.sttSettings?.provider}
              options={Object.values(STTProvider)}
              renderOption={(option) => option}
              value={config.sttSettings?.provider}
              onSelect={(option) =>
                onChange("sttSettings", {
                  ...config.sttSettings,
                  provider: option,
                })
              }
            />
          </Field>
        </Card>
      </div>
    </div>
  );
};
