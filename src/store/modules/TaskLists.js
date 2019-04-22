import axios from 'axios';

export default {
  namespaced: true,
  state: {
    lists: [],
    selectedList: null,
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
    },
    changeSelectedList(state, selectedList) {
      state.selectedList = selectedList;
    },
    addList(state, list) {
      state.lists.push(list);
      state.selectedList = list._id;
    },
    removeTaskList(state, listID) {
      const index = state.lists.findIndex(list => list._id === listID);
      state.lists.splice(index, 1);
      if(index > 0)
        state.selectedList = state.lists[index - 1]._id;
      else if(state.lists.length > 0)
        state.selectedList = state.lists[index]._id;
    },
  },
  actions: {
    async getTaskLists({ dispatch, commit }) {
      try {
        const lists = await axios.get('ObtenerListas');
        commit('setLists', lists);

        if (lists.length > 0) {
          commit('changeSelectedList', lists[0]._id);
        }
      } catch (error) {
        commit('setSnack', 'Error al cargar listas', { root: true });
      }
    },
    async newTaskLists({ dispatch, commit }, lista) {
      try {
        const list = await axios.post('agregarLista', lista);
        commit('addList', list);
        return true;
      } catch (error) {
        commit('setSnack', 'Error al agregar nueva lista', { root: true });
        return false;
      }
    },
    async removeTaskList({ dispatch, commit, state }) {
      try {
        const response = await axios.delete('borrarLista/', {
          data: {
            id: state.selectedList,
          },
        });
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        commit('removeTaskList', response._id);
        return true;
      } catch (error) {
        commit('setSnack', 'Error al eliminar lista', { root: true });
        return false;
      }
    },
  },
};
