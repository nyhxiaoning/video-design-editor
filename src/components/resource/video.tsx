import { getResoueceConfig } from "@/service/demo";
import { useRequest } from "ahooks";
import addIcon from "@/assets/svg/add.svg";

const VideoResource = ({
  add,
}: {
  add: (params: { type: string; data: any }) => void;
}) => {
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
                add({ type: "video", data: item });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoResource;
