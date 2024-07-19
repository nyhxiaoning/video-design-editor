import imageIcon from "@/assets/svg/image.svg";
import audioIcon from "@/assets/svg/audio.svg";
import textIcon from "@/assets/svg/text.svg";
import videoIcon from "@/assets/svg/video.svg";
import React, { useState } from "react";
import VideoResource from "./resource/video";
import TextResource from "./resource/text";
import ImageResource from "./resource/image";
import AudioResource from "./resource/audio";
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
  return (
    <div className="w-[386px] border-[#101214] border-solid border-r-2 flex">
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
      <div>
        {componentMap.get(currentComponentKey) &&
          React.createElement(componentMap.get(currentComponentKey), {
            add: ({ type, data }: { type: string; data: any }) => {
              console.log("type :>> ", type);
              console.log("data :>> ", data);
            },
          })}
      </div>
    </div>
  );
};

export default EditorResource;
