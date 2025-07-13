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

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-7 relative items-center">
        <ToggleGroup
        className={`${isVoiceChatLoading && "opacity-50" }`}
        disabled={isVoiceChatLoading}
        type="single"
        value={isVoiceChatActive || isVoiceChatLoading ? "voice" : "text"}
        onValueChange={(value) => {
          if (value === "voice" && !isVoiceChatActive && !isVoiceChatLoading) {
            startVoiceChat();
          } else if (
            value === "text" &&
            isVoiceChatActive &&
            !isVoiceChatLoading
          ) {
            stopVoiceChat();
          }
        }}
      >
        <ToggleGroupItem
          className="data-[state=on]:bg-zinc-800 rounded-lg p-2 text-sm w-[90px] text-center hover:!bg-zinc-600 transition ease duration-300 mr-4"
          value="voice"
        >
          Voice Chat
        </ToggleGroupItem>
        <ToggleGroupItem
          className="data-[state=on]:bg-zinc-800 rounded-lg p-2 text-sm w-[90px] text-center hover:!bg-zinc-600 transition ease duration-300"
          value="text"
        >
          Text Chat
        </ToggleGroupItem>
      </ToggleGroup>
      {/* </Card> */}
      <Card className="w-full lg:!p-3 flex items-center gap-3">
        {isVoiceChatActive || isVoiceChatLoading ? <AudioInput /> : <TextInput />}
      </Card>
      <div className="absolute top-[-70px] right-3">
        <Button className="!bg-[#3f3f46] hover:!bg-zinc-600 !text-white" onClick={interrupt}>
          Interrupt
        </Button>
      </div>
    </div>
  );
};
