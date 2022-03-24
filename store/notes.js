export const state = () => ({
    notes: [
        // {
        //     id: 0,
        //     content: "hello world",
        //     created_date: '22/11/2222'
        // },
        // {
        //     id: 1,
        //     content: "hello world 1",
        //     created_date: '22/11/2222'
        // },

        // {
        //     id: 2,
        //     content: "hello world 2 hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2hello world 2",
        //     created_date: '22/11/2222'
        
        // }
    ]
})

export const mutations = {
    add(state, note) {
        state.notes.push( note )
    },

    init(state, notes) {
        state.notes = notes;
    }
}

export const getters = {
    getNotes(state) {
      return state.notes
    }
}

export const actions = {
    init({commit}) {
        this.$axios
        .$get('notes')
        .then((result) => {
            console.log(result)
            commit('init', result)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    storeNotes({ commit }, notes) {
        commit('add', notes)
    }
}