import redoIcon from "@/assets/svg/redo.svg";
import undoIcon from "@/assets/svg/undo.svg";
import splitIcon from "@/assets/svg/split.svg";
import deleteIcon from "@/assets/svg/delete.svg";
import plusIcon from "@/assets/svg/plus.svg";
import loseIcon from "@/assets/svg/lose.svg";
import { Slider } from "antd";
import "antd/dist/antd.css";
import {
  Timeline,
  TimelineAction,
  TimelineRow,
  TimelineState,
} from "@xzdarcy/react-timeline-editor";
import { useState } from "react";
type TLActionWithName = TimelineAction & { name: string };
export const TimelineEditor = ({
  timelineData: tlData,
  onPreviewTime,
  onOffsetChange,
  onDuraionChange,
  onDeleteAction,
  timelineState,
  onSplitAction,
}: {
  timelineData: TimelineRow[];
  timelineState: React.MutableRefObject<TimelineState | undefined>;
  onPreviewTime: (time: number) => void;
  onOffsetChange: (action: TimelineAction) => void;
  onDuraionChange: (args: {
    action: TimelineAction;
    start: number;
    end: number;
  }) => void;
  onDeleteAction: (action: TimelineAction) => void;
  onSplitAction: (action: TLActionWithName) => void;
}) => {
  const [scale, setScale] = useState(30);
  const [activeAction, setActiveAction] = useState<TLActionWithName | null>(
    null
  );
  const [lastAction, setLastAction] = useState<TLActionWithName | null>(null);
  return (
    <div className="h-[254px] border-solid border-t-2  border-[#101214]">
      <div className="h-12 flex items-center justify-between px-[14px]">
        <div className="flex items-center gap-x-4">
          <img src={redoIcon} className="cursor-pointer" />
          <img src={undoIcon} className="cursor-pointer" />
          <img
            src={splitIcon}
            className={`${activeAction ? "cursor-pointer" : "opacity-30"}`}
            onClick={() => {
              if (null === activeAction) return;
              onSplitAction(activeAction);
            }}
          />
          <img
            src={deleteIcon}
            className={`${activeAction ? "cursor-pointer" : "opacity-30"}`}
            onClick={() => {
              if (null === activeAction) return;
              onDeleteAction(activeAction);
            }}
          />
        </div>
        <div className="flex items-center">
          <img
            src={loseIcon}
            className={`mr-5 ${scale <= 0 ? "opacity-30" : "cursor-pointer"}`}
            onClick={() => {
              setScale(Math.max(scale - 5, 0));
            }}
          />
          <Slider
            className="w-[96px]"
            value={scale}
            onChange={(value) => {
              setScale(value);
            }}
          ></Slider>
          <img
            src={plusIcon}
            className={`ml-5 ${
              scale >= 100 ? "opacity-30" : "cursor-pointer"
            } `}
            onClick={() => {
              setScale(Math.min(scale + 5, 100));
            }}
          />
        </div>
      </div>
      <Timeline
        ref={(el) => {
          if (null === el) return;
          timelineState.current = el;
        }}
        style={{ width: "100%", height: "250px", background: "#181a1f" }}
        effects={{}}
        scale={scale}
        dragLine={true}
        gridSnap={true}
        editorData={tlData}
        scaleSplitCount={5}
        onClickTimeArea={(time) => {
          onPreviewTime(time);
          return true;
        }}
        onCursorDragEnd={(time) => {
          onPreviewTime(time);
        }}
        onActionResizing={({ dir, action, start, end }) => {
          if (dir === "left") return false;
          return onDuraionChange({ action, start, end });
        }}
        onActionMoveEnd={({ action }) => {
          onOffsetChange(action);
        }}
        onClickAction={(_, { action }) => {
          setActiveAction(action as TLActionWithName);
          if (lastAction) {
            lastAction.selected = false;
          }
          action.selected = true;
          setLastAction(action as TLActionWithName);
        }}
      ></Timeline>
    </div>
  );
};

export default TimelineEditor;
