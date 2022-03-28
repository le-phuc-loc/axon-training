export const state = () => ({
    notes: [],
    currentPage: 0,
    isTheLastPage: false,
    searchedNotes: {
        data: [],
        currentPage: 0,
        isTheLastPage: false
    }
})

export const mutations = {
    init(state) {
        state.notes = []
        state.currentPage = 0
        state.isTheLastPage = false
    },

    fetchNotes(state, notes) {
        state.notes.push(...notes)
        state.currentPage++
    },

    setIsTheLastPage(state, isTheLastPage) {
        state.isTheLastPage = isTheLastPage
    },

    addNote(state, note) {
        state.notes.unshift( note )
    },

    updateNote(state, note) {
        state.notes = state.notes.map((record) => {
            if (record.id === note.id) {
                console.log({...record, content: note.content})
            }
            return record.id === note.id ? {...record, content: note.content} : record
        })
    },

    deleteNote(state, id) {
        state.notes = state.notes.filter( (record) => {return record.id !== id} )
    },

    fetchSearchedNotes(state, searchedNotes) {
        state.searchedNotes.data.push(...searchedNotes)
        state.searchedNotes.currentPage++
    },

    initsearchedNotes(state) {
        state.searchedNotes.data = []
        state.searchedNotes.currentPage = 0
        state.searchedNotes.isTheLastPage = false
    },

    setIsTheLastPageOfsearchedNotes(state, isTheLastPage) {
        state.searchedNotes.isTheLastPage = isTheLastPage
    },    

    addToNotesIfNewNoteAddedFromAnotherWay(state, notes) {
        notes.reverse().forEach(record => {
            if (!state.notes.some(note => note.id === record.id)) {
                state.notes.unshift(record)
            }
        });
    },   
    
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
    },

    getsearchedNotes(state) {
        return state.searchedNotes
    }


}

export const actions = {
    init({commit}) {
        commit('init')
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
            if (result.length < 8) {
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
            alert("add note successfully!!!")
        })
        .catch((error) => {
            alert(error)
        })
    },

    async updateNote({commit}, payload) {
        await this.$axios
        .$put(`/notes/${payload.id}`,  payload )
        .then((result) => {
            commit('updateNote', payload)
        })
        .catch((error) => {
            alert(error)
        })
    },

    async deleteNote({commit}, payload) {
        await this.$axios
        .$delete(`/notes/${payload.id}`)
        .then(() => {
            commit('deleteNote', payload.id)
            alert("delete note successfully!!!")
        })
        .catch((error) => {
            alert(error)
        })
    },

    initSearchedNote({commit}) {
        commit('initsearchedNotes')
    },

    async fetchSearchedNotes({commit}, payload) {
        await this.$axios
        .$get('/notes', { params: payload})
        .then((result) => {
            commit('fetchSearchedNotes', result)
            commit('addToNotesIfNewNoteAddedFromAnotherWay', result)
            if (result.length < 8) {
                commit('setIsTheLastPageOfsearchedNotes', true)
            }
        })
        .catch((error) => {
            alert(error)
        })
    }
}