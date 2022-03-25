export const state = () => ({
    notes: [],
    currentPage: 0,
    isTheLastPage: false
})

export const mutations = {
    addNote(state, note) {
        state.notes.unshift( note )
    },

    deleteNote(state, note) {
        state.notes = state.notes.filters( (record) => record.id !== note.id )
    },

    increaseCurrentPage(state) {
        state.currentPage++;
    },

    fetchNotes(state, notes) {
        state.notes.push(...notes)
    },

    init(state) {
        state.notes = []
        state.currentPage = 0
        state.isTheLastPage = false
    },

    setIsTheLastPage(state, isTheLastPage) {
        state.isTheLastPage = isTheLastPage
    }
}

export const getters = {
    getNotes(state) {
      return state.notes
    },

    getCurrentPage(state) {
        return state.currentPage
    },

    isTheLastPage(state) {
        return state.isTheLastPage
    }
}

export const actions = {
    async init({commit}) {
        await this.$axios
        .$get('/notes')
        .then((result) => {
            commit('init', result)
        })
        .catch((error) => {
            console.log(error)
        })
    },

    storeNotes({ commit }, payload) {
        commit('add', payload)
    },

    increaseCurrentPage({ commit }) {
        commit('increaseCurrentPage')
    },

    setIsTheLastPage({ commit }, payload) {
        commit('setIsTheLastPage', payload)
    },

    async fetchNotes({ commit }, payload) {
        await this.$axios
        .$get('/notes', { params: payload})
        .then((result) => {
            commit('fetchNotes', result)
            commit('increaseCurrentPage')
            if (result.length <= 0) {
                commit('setIsTheLastPage', true)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },

    async addNote({commit}, payload) {
        await this.$axios
        .$post('/notes',  payload )
        .then((result) => {
            commit('addNote', result)
            console.log("add note successfully!!!")
        })
        .catch((error) => {
            console.log(error)
        })
    },

    async deleteNote({commit}, payload) {
        await this.$axios
        .$delete(`/notes/${payload.id}`)
        .then(() => {
            commit('deleteNote', payload)
            console.log("delete note successfully!!!")
        })
        .catch((error) => {
            console.log(error)
        })
    }
}