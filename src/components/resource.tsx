import imageIcon from "@/assets/svg/image.svg";
import audioIcon from "@/assets/svg/audio.svg";
import addIcon from "@/assets/svg/add.svg";
import textIcon from "@/assets/svg/text.svg";
import videoIcon from "@/assets/svg/video.svg";
import { useState } from "react";
import { AudioClip, ImgClip, MP4Clip, VisibleSprite } from "@webav/av-cliper";
import { useRequest } from "ahooks";
import { getResoueceConfig } from "@/service/demo";
import { convertMicrosecondsToPlayerTime } from "@/utils/time";

enum eResourceType {
  "video",
  "aduio",
}
interface IResourceProps {
  add: (params: { type: eResourceType; data: any }) => void;
}

const VideoResource: React.FC<IResourceProps> = ({ add }) => {
  const { data } = useRequest(getResoueceConfig, { defaultParams: ["video"] });
  return (
    <div>
      {data?.data.data.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="items-center w-[130px] h-[74px] overflow-hidden rounded relative"
          >
            <img src={item.cover} className="h-full" />
            <img
              src={addIcon}
              className="absolute bottom-2 right-2 cursor-pointer "
              onClick={() => {
                add({ type: eResourceType.video, data: item });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const AudioResource: React.FC<IResourceProps> = ({ add }) => {
  const { data } = useRequest(getResoueceConfig, { defaultParams: ["audio"] });
  return (
    <div className="flex flex-col gap-y-3">
      {data?.data?.data.map((item: any, index: number) => {
        return (
          <div key={index} className="flex items-center relative">
            <img src={item.cover} className="w-14 h-14" />
            <div className="ml-4">
              <p className="text-xs text-white">{item.name}</p>
              <p className="text-xs text-white/60 mt-[4px]">
                {convertMicrosecondsToPlayerTime(0, false)}
              </p>
            </div>
            <img
              src={addIcon}
              className="absolute right-[5px] cursor-pointer"
              onClick={() => {
                add({ type: eResourceType.aduio, data: item });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const TextResource: React.FC<IResourceProps> = () => {
  return <div>TextResource</div>;
};

const ImageResource: React.FC<IResourceProps> = () => {
  return <div>ImageResource</div>;
};

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
const EditorResource = ({
  addSprite2Track,
}: {
  addSprite2Track: (trackId: string, spr: VisibleSprite, name: string) => void;
}) => {
  const [currentComponentKey, setCurrentComponentKey] = useState("video");
  const renderComponent = () => {
    const Component = componentMap.get(currentComponentKey);
    if (Component) {
      return (
        <Component
          add={async ({ type, data }) => {
            if (eResourceType.video === type) {
              const spr = new VisibleSprite(
                new MP4Clip((await fetch(data?.source)).body!)
              );
              addSprite2Track("1-video", spr, data?.name);
            } else if (eResourceType.aduio === type) {
              const spr = new VisibleSprite(
                new AudioClip((await fetch(data?.source)).body!)
              );
              addSprite2Track("2-audio", spr, data?.name);
            } else if ("image" === type) {
              const clip = new ImgClip({
                type: "image/gif",
                stream: (await fetch(data?.source)).body!,
              });
              const spr = new VisibleSprite(clip);
              addSprite2Track("3-img", spr, data?.name);
            }
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
