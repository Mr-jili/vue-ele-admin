const state = {
  visitedViews: []
};

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name",
      })
    );
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
  },

  DEL_ALL_VISITED_VIEWS: (state) => {
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
  SAVE_SESSION: (state) => {
    let tsgArr = [];
    for (let key of state.visitedViews) {
      tsgArr.push({
        fullPath: key.fullPath,
        name: key.name,
        path: key.path,
        title: key.title,
        meta: {...key.meta}
      })
    }
    sessionStorage.setItem("tsgArr", JSON.stringify(tsgArr))
  },
  CHANGE_VIEW: (state) => {
    state.visitedViews = JSON.parse(sessionStorage.getItem("tsgArr")) || []
  }
};

const actions = {
  addView({ dispatch }, view) {
    dispatch("addVisitedView", view);
  },
  addVisitedView({ commit }, view) {
    commit("CHANGE_VIEW")
    commit("ADD_VISITED_VIEW", view);
    commit("SAVE_SESSION")
  },

  delView({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delVisitedView", view);
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },
  delVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("CHANGE_VIEW")
      commit("DEL_VISITED_VIEW", view);
      resolve([...state.visitedViews]);
      commit("SAVE_SESSION")
    });
  },
  delOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delOthersVisitedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("CHANGE_VIEW")
      commit("DEL_OTHERS_VISITED_VIEWS", view);
      resolve([...state.visitedViews]);
      commit("SAVE_SESSION")
    });
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delAllVisitedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit("CHANGE_VIEW")
      commit("DEL_ALL_VISITED_VIEWS");
      resolve([...state.visitedViews]);
      commit("SAVE_SESSION")
    });
  },
  updateVisitedView({ commit }, view) {
    commit("UPDATE_VISITED_VIEW", view);
    commit("SAVE_SESSION")
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
