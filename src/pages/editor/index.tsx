import EditorHeader from "@/components/header";
import EditorResource from "@/components/resource";
import EditorAttribute from "@/components/attribute";
import EditorTrack from "@/components/track";
import { useRef } from "react";
import { TimelineState } from "@xzdarcy/react-timeline-editor";
const EditorPage = () => {
  const tlState = useRef<TimelineState>();
  return (
    <div className="flex flex-col h-full">
      <EditorHeader></EditorHeader>
      <div className="flex grow w-full">
        <EditorResource></EditorResource>
        <div className="grow flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1"></div>
            <EditorAttribute></EditorAttribute>
          </div>
          <EditorTrack
            timelineData={[]}
            timelineState={tlState}
            onPreviewTime={(time) => {
              console.log("time :>> ", time);
            }}
            onDeleteAction={(action) => {
              console.log("action :>> ", action);
            }}
            onSplitAction={(action) => {
              console.log("action :>> ", action);
            }}
            onOffsetChange={(action) => {
              console.log("action :>> ", action);
            }}
            onDuraionChange={({ action, start, end }) => {
              console.log("action :>> ", action, start, end);
            }}
          ></EditorTrack>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
