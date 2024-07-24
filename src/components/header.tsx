import { Button } from "antd";
import fullIcon from "@/assets/svg/page_full.svg";
import fullExitIcon from "@/assets/svg/full_exit.svg";
const EditorHeader = ({
  hadnleSave,
  fullToggle,
  isFull = false,
}: {
  hadnleSave: () => void;
  fullToggle: () => void;
  isFull: boolean;
}) => {
  return (
    <div className="h-12 min-h-12 w-full border-[#101214] border-solid border-b-2 flex items-center justify-between px-4">
      <div></div>
      <div className="flex gap-x-3">
        <div
          className="w-7 h-7 bg-[#484952] flex items-center justify-center rounded cursor-pointer"
          onClick={() => fullToggle()}
        >
          <img src={isFull ? fullExitIcon : fullIcon} alt="" />
        </div>
        <Button type="primary" size="small" onClick={() => hadnleSave()}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
