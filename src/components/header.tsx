import { Button } from "antd";

const EditorHeader = ({ hadnleSave }: { hadnleSave: () => void }) => {
  return (
    <div className="h-12 min-h-12 w-full border-[#101214] border-solid border-b-2 flex items-center justify-between px-4">
      <div></div>
      <Button type="primary" size="small" onClick={() => hadnleSave()}>
        保存
      </Button>
    </div>
  );
};

export default EditorHeader;
