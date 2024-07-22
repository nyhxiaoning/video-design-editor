import imageIcon from "@/assets/svg/image.svg";
import audioIcon from "@/assets/svg/audio.svg";
import textIcon from "@/assets/svg/text.svg";
import videoIcon from "@/assets/svg/video.svg";
import React, { useState } from "react";
import VideoResource from "./resource/video";
import TextResource from "./resource/text";
import ImageResource from "./resource/image";
import AudioResource from "./resource/audio";
import { useDispatch } from "umi";
import { AudioClip, MP4Clip } from "@webav/av-cliper";
const menuData = [
  {
    title: "视频",
    key: "video",
    icon: videoIcon,
  },
  {
    title: "音频",
    key: "audio",
    icon: audioIcon,
  },
  {
    title: "图片",
    key: "image",
    icon: imageIcon,
  },
  {
    title: "文字",
    key: "text",
    icon: textIcon,
  },
];
const componentMap = new Map([
  ["video", VideoResource],
  ["text", TextResource],
  ["image", ImageResource],
  ["audio", AudioResource],
]);
const EditorResource = () => {
  const [currentComponentKey, setCurrentComponentKey] = useState("video");
  const dispatch = useDispatch();
  const renderComponent = () => {
    const Component = componentMap.get(currentComponentKey);
    if (Component) {
      return (
        <Component
          add={async ({
            type,
            data,
          }: {
            type: string;
            data: Record<string, any>;
          }) => {
            const params = {
              type,
              source: data.source,
            };
            if (type === "video") {
              const mp4 = new MP4Clip((await fetch(data?.source)).body!);
              await mp4.ready;
            } else if (type === "audio") {
              const audio = new AudioClip((await fetch(data?.source)).body!);
              await audio.ready;
            }
            dispatch({
              type: "track/addTrack",
              payload: params,
            });
          }}
        />
      );
    }
    // 如果组件不存在，可以返回null或一些加载/错误指示器
    return null;
  };

  return (
    <div className="w-[386px] min-w-[386px] border-[#101214] border-solid border-r-2 flex">
      <div className="w-[76px] border-[#101214] border-solid border-r-2 px-[3px]">
        {menuData.map((item, key) => {
          return (
            <div
              key={key}
              className={`w-[68px] h-[58px] flex flex-col items-center justify-center cursor-pointer ${
                currentComponentKey === item.key ? "" : "opacity-20"
              }`}
              onClick={() => {
                setCurrentComponentKey(item.key);
              }}
            >
              <img src={item.icon} className="w-5 h-5" />
              <span className="text-white/90 text-xs leading-5">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="p-4 grow">{renderComponent()}</div>
    </div>
  );
};

export default EditorResource;
