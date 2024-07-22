import { getResoueceConfig } from "@/service/demo";
import { convertMicrosecondsToPlayerTime } from "@/utils/time";
import { useRequest } from "ahooks";
import { useState } from "react";
import addIcon from "@/assets/svg/add.svg";
const AudioCard = ({
  name,
  cover,
  add,
}: {
  id: number;
  name: string;
  cover: string;
  add: () => void;
}) => {
  const [duration] = useState(0);
  return (
    <div className="flex items-center relative">
      <img src={cover} className="w-14 h-14" />
      <div className="ml-4">
        <p className="text-xs text-white">{name}</p>
        <p className="text-xs text-white/60 mt-[4px]">
          {convertMicrosecondsToPlayerTime(duration, false)}
        </p>
      </div>
      <img
        src={addIcon}
        className="absolute right-[5px] cursor-pointer"
        onClick={add}
      />
    </div>
  );
};
const AudioResource = ({
  add,
}: {
  add: (params: { type: string; data: any }) => void;
}) => {
  const { data } = useRequest(getResoueceConfig, { defaultParams: ["audio"] });
  return (
    <div className="flex flex-col gap-y-3">
      {data?.data?.data.map((item: any) => {
        return (
          <AudioCard
            key={item.id}
            {...item}
            add={() => {
              add({ type: "audio", data: item });
            }}
          ></AudioCard>
        );
      })}
    </div>
  );
};
export default AudioResource;
