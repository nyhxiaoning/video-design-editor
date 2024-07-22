export default {
  "GET /api/resource": (_req: any, res: any) => {
    console.log("_req :>> ", _req?.query);
    const mockData: Record<string, any> = {
      video: [
        {
          id: 1,
          name: "示例视频1",
          cover: "/image/video/video_1.png",
          source: "/video/video_1.mp4",
        },
      ],
      audio: [
        {
          id: 1,
          cover: "/image/audio/audio_0.png",
          source: "/audio/audio_0.mp3",
          name: "测试歌曲1",
        },
        {
          id: 2,
          cover: "/image/audio/audio_1.png",
          source: "/audio/audio_1.mp3",
          name: "测试歌曲2",
        },
        {
          id: 3,
          cover: "/image/audio/audio_2.png",
          source: "/audio/audio_2.mp3",
          name: "测试歌曲3",
        },
        {
          id: 4,
          cover: "/image/audio/audio_3.png",
          source: "/audio/audio_3.mp3",
          name: "测试歌曲4",
        },
        {
          id: 5,
          cover: "/image/audio/audio_4.png",
          source: "/audio/audio_4.mp3",
          name: "测试歌曲5",
        },
        {
          id: 6,
          cover: "/image/audio/audio_5.png",
          source: "/audio/audio_5.mp4",
          name: "测试歌曲6",
        },
      ],
    };
    const type = _req?.query.type === "undefined" ? "video" : _req?.query.type;
    res.json({
      success: true,
      data: mockData[type],
      errorCode: 0,
    });
  },
};
