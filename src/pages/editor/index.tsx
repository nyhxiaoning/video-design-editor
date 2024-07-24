import EditorHeader from "@/components/header";
import EditorResource from "@/components/resource";
import EditorAttribute from "@/components/attribute";
import EditorTrack from "@/components/track";
import { useEffect, useRef, useState } from "react";
import "./style.less";
import {
  TimelineAction,
  TimelineRow,
  TimelineState,
} from "@xzdarcy/react-timeline-editor";
import { AVCanvas } from "@webav/av-canvas";
import { convertMicrosecondsToPlayerTime } from "@/utils/time";
import { useDispatch, useSelector } from "umi";
import pauseIcon from "@/assets/svg/pause.svg";
import playIcon from "@/assets/svg/play.svg";
import fullIcon from "@/assets/svg/full.svg";
import { ImgClip, VisibleSprite } from "@webav/av-cliper";
import { message } from "antd";
const actionSpriteMap = new WeakMap<TimelineAction, VisibleSprite>();
const EditorPage = () => {
  const tlState = useRef<TimelineState>();
  const [tlData, setTLData] = useState<TimelineRow[]>([
    { id: "1-video", actions: [] },
    { id: "2-audio", actions: [] },
    { id: "3-img", actions: [] },
    { id: "4-text", actions: [] },
  ]);
  const dispatch = useDispatch();
  const isPlay = useSelector((state: any) => state.player.isPlay);
  const [avCvs, setAVCvs] = useState<AVCanvas | null>(null);
  const [cvsWrapEl, setCvsWrapEl] = useState<HTMLDivElement | null>(null);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [totalTime] = useState(0);
  useEffect(() => {
    if (cvsWrapEl == null) return;
    avCvs?.destroy();
    const cvs = new AVCanvas(cvsWrapEl, {
      bgColor: "#000",
      width: 600,
      height: 400,
    });
    setAVCvs(cvs);
    cvs.on("timeupdate", (time) => {
      if (tlState.current == null) return;
      tlState.current.setTime(time / 1e6);
      setCurrentPlayTime(time);
    });
    cvs.on("playing", () => {
      dispatch({ type: "player/setPlayer", payload: true });
    });
    cvs.on("paused", () => {
      dispatch({ type: "player/setPlayer", payload: false });
    });
    return () => {
      cvs.destroy();
    };
  }, [cvsWrapEl]);

  useEffect(() => {}, [tlData]);

  async function addSprite2Track(
    trackId: string,
    spr: VisibleSprite,
    name: string = ""
  ) {
    await avCvs?.addSprite(spr);
    const track = tlData.find(({ id }) => id === trackId);
    if (track == null) return null;
    const start =
      spr.time.offset === 0
        ? Math.max(...track.actions.map((a) => a.end), 0) * 1e6
        : spr.time.offset;
    spr.time.offset = start;
    if (spr.time.duration === Infinity) {
      spr.time.duration = 10e6;
    }
    const action = {
      id: Math.random().toString(),
      start: start / 1e6,
      end: (spr.time.offset + spr.time.duration) / 1e6,
      effectId: "audio",
      name,
    };
    actionSpriteMap.set(action, spr);
    track.actions.push(action);
    setTLData(
      tlData
        .filter((it) => it !== track)
        .concat({ ...track })
        .sort((a, b) => a.id.charCodeAt(0) - b.id.charCodeAt(0))
    );
  }

  function handleSave() {
    localStorage.setItem("trackData", JSON.stringify(tlData));
    message.success("保存成功");
  }

  return (
    <div className="flex flex-col h-full">
      <EditorHeader hadnleSave={() => handleSave()}></EditorHeader>
      <div className="flex grow w-full">
        <EditorResource addSprite2Track={addSprite2Track}></EditorResource>
        <div className="grow flex flex-col">
          <div className="flex-1 flex">
            {/* 播放器 */}
            <div className="w-full flex flex-col h-full relative">
              <p className="h-10 text-sm font-medium dark:text-white/90 flex items-center pl-4">
                播放器
              </p>
              <div className="flex-1 flex items-center justify-center">
                <div ref={(el) => setCvsWrapEl(el)}></div>
              </div>
              <div className="flex items-center	justify-between h-12 px-[14px]">
                <div className="text-xs select-none">
                  <span>
                    {convertMicrosecondsToPlayerTime(currentPlayTime)}
                  </span>
                  / <span>{convertMicrosecondsToPlayerTime(totalTime)}</span>
                </div>
                <img
                  src={isPlay ? pauseIcon : playIcon}
                  className="cursor-pointer absolute left-1/2 -translate-x-1/2 "
                  onClick={() => {
                    if (avCvs == null || tlState.current == null) return;
                    if (isPlay) {
                      avCvs.pause();
                    } else {
                      avCvs.play({ start: tlState.current.getTime() * 1e6 });
                    }
                  }}
                />
                <img src={fullIcon} className="cursor-pointer	" />
              </div>
            </div>
            <EditorAttribute></EditorAttribute>
          </div>
          <EditorTrack
            timelineData={tlData}
            timelineState={tlState}
            onPreviewTime={(time) => {
              avCvs?.previewFrame(time * 1e6);
            }}
            onDeleteAction={(action) => {
              const spr = actionSpriteMap.get(action);
              if (null == spr) return;
              avCvs?.removeSprite(spr);
              actionSpriteMap.delete(action);
              const track = tlData
                .map((t) => t.actions)
                .find((actions) => actions.includes(action));
              if (null == track) return;
              track.splice(track.indexOf(action), 1);
              setTLData([...tlData]);
            }}
            onSplitAction={async (action) => {
              const spr = actionSpriteMap.get(action);
              if (null == spr || null == avCvs || null == tlState.current)
                return;
              const newClips = await spr
                .getClip()
                .split(tlState.current.getTime() * 1e6 - spr.time.offset);
              // 删除旧对象
              avCvs.removeSprite(spr);
              actionSpriteMap.delete(action);
              const track = tlData.find((t) => t.actions.includes(action));
              if (null == track) return;
              track.actions.splice(track.actions.indexOf(action), 1);
              setTLData([...tlData]);
              // 添加分割后生成的两个对象
              const sprsDuration = [
                tlState.current.getTime() * 1e6 - spr.time.offset,
                spr.time.duration -
                  (tlState.current.getTime() * 1e6 - spr.time.offset),
              ];
              const sprsOffset = [
                spr.time.offset,
                spr.time.offset + sprsDuration[0],
              ];
              for (let i = 0; i < newClips.length; ++i) {
                const clip = newClips[i];
                const newSpr = new VisibleSprite(clip);
                if (clip instanceof ImgClip) {
                  newSpr.time.duration = sprsDuration[i];
                }
                newSpr.time.offset = sprsOffset[i];
                await avCvs.addSprite(newSpr);
                addSprite2Track(track.id, newSpr, action.name);
              }
            }}
            onOffsetChange={(action) => {
              const spr = actionSpriteMap.get(action);
              if (null == spr) return;
              spr.time.offset = action.start * 1e6;
              const _action = tlData
                .map((t) => t.actions)
                .find((actions) => actions.includes(action))
                ?.find((a) => a.id == action.id);
              if (_action == null) return;
              _action.start = action.start;
              setTLData([...tlData]);
            }}
            onDuraionChange={({ action, start, end }) => {
              const spr = actionSpriteMap.get(action);
              if (null == spr) return false;
              const duration = (end - start) * 1e6;
              if (duration > spr.getClip().meta.duration) return false;
              spr.time.duration = duration;
              let _action = tlData
                .map((t) => t.actions)
                .find((_actions) => _actions.includes(action))
                ?.find((a) => a.id == action.id);
              if (!_action) return false;
              _action.end = end;
              _action.start = start;
              setTLData([...tlData]);
              return true;
            }}
          ></EditorTrack>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
