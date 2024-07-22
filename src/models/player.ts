interface PlayerState {
  isPlay: boolean;
}

interface PlayerModel {
  namespace: string;
  state: PlayerState;
  reducers: {
    setPlayer(state: PlayerState, actions: { payload: boolean }): void;
  };
}
export default {
  namespace: "player",
  state: {
    isPlay: false,
  },
  reducers: {
    setPlayer(state, { payload }) {
      return {
        ...state,
        isPlay: payload,
      };
    },
  },
  effects: {},
} as PlayerModel;
