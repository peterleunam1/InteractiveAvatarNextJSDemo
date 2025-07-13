import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

import { useVoiceChat } from "../logic/useVoiceChat";
import { Button } from "../Button";
import { useInterrupt } from "../logic/useInterrupt";

import { AudioInput } from "./AudioInput";
import { TextInput } from "./TextInput";

import { Card } from "../Card";

export const AvatarControls: React.FC = () => {
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
    startVoiceChat,
    stopVoiceChat,
  } = useVoiceChat();
  const { interrupt } = useInterrupt();
  const handleToggle = (value: string) => {
    if (value === "voice" && !isVoiceChatActive && !isVoiceChatLoading) {
      startVoiceChat();
    } else if (value === "text" && isVoiceChatActive && !isVoiceChatLoading) {
      stopVoiceChat();
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-7 relative items-center">
      <ToggleGroup
        className={`inline-flex rounded-xl bg-gray-100 shadow-inner p-1 transition-opacity duration-300 ${
          isVoiceChatLoading ? "opacity-50" : ""
        }`}
        disabled={isVoiceChatLoading}
        type="single"
        value={isVoiceChatActive || isVoiceChatLoading ? "voice" : "text"}
        onValueChange={handleToggle}
      >
        <ToggleGroupItem
          className="data-[state=on]:bg-indigo-600 data-[state=on]:text-white rounded-lg px-4 py-2 text-sm w-[120px] text-center text-gray-700 hover:bg-indigo-100 transition-all duration-300 ease-in-out mr-1"
          value="voice"
        >
          Voice Chat
        </ToggleGroupItem>
        <ToggleGroupItem
          className="data-[state=on]:bg-indigo-600 data-[state=on]:text-white rounded-lg px-4 py-2 text-sm w-[120px] text-center text-gray-700 hover:bg-indigo-100 transition-all duration-300 ease-in-out"
          value="text"
        >
          Text Chat
        </ToggleGroupItem>
      </ToggleGroup>

      <Card className="w-full lg:!p-3 flex !justify-center items-center gap-3 mx-auto">
        {isVoiceChatActive || isVoiceChatLoading ? (
          <AudioInput />
        ) : (
          <TextInput />
        )}
      </Card>

      <div className="absolute top-[-70px] right-3">
        <Button
          className="!bg-gray-200 hover:!bg-gray-300 !text-gray-800 border border-gray-300 shadow-sm"
          onClick={interrupt}
        >
          Interrupt
        </Button>
      </div>
    </div>
  );
};
