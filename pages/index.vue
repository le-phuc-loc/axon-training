<template>
  <div class="main">
    <v-row class="header-index">
      <v-col :cols="6"> NOTES </v-col>
      <v-col :cols="6" class="text-right">
        <AddNoteDialog />
      </v-col>
    </v-row>
    <v-text-field
      class="search-field"
      @keyup.enter="addNote"
      label="Type to search ..."
      outlined
      dense
      :elevation = "1"
      @input="debounceInput"
      v-model="searchContent"
    ></v-text-field>

    <v-list v-if="searchContent" three-line>
      <ItemCard v-for="note in searchedNotes.data" :key="note.id" :note="note" />
    </v-list>
    <v-list v-else three-line>
      <ItemCard  v-for="note in notes" :key="note.id" :note="note" />
    </v-list>
    
  </div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue";
import AddNoteDialog from "../components/AddNoteDialog.vue";
import _ from 'lodash';


export default {
  name: "note",

  data: () => ({
    searchContent: "",
    timeOut: null,
  }),

  async fetch({ store }) {
    if (store.getters["notes/getNotes"] !== [] && store.getters["notes/getNotes"].length <= 0) {
      await store.dispatch("notes/init")
      await store.dispatch("notes/fetchNotes", {})
    }
  },

  computed: {
    notes() {
      return this.$store.getters["notes/getNotes"]
    },
    searchedNotes() {
      return this.$store.getters["notes/getsearchedNotes"]
    },
    
  },
  mounted() {
    this.scroll();
  },
  methods: {
  
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight
        

        if (bottomOfWindow) {
          
          if (this.searchContent) {
            
            if (!this.searchedNotes.isTheLastPage) {
              
              this.$store.dispatch("notes/fetchSearchedNotes", {
                content: this.searchContent,
                page_index: this.searchedNotes.currentPage
              })
            }
          }
          else {
            if (!this.$store.getters["notes/isTheLastPage"]) {
              this.$store.dispatch("notes/fetchNotes", {
                page_index: this.$store.getters["notes/getCurrentPage"],
              })
            }
          }
          
        }
      };
    },

    debounceInput() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$store.dispatch('notes/initSearchedNote')
        this.$store.dispatch('notes/fetchSearchedNotes', {
          content: this.searchContent
        })
      }, 500);
    },
    
  },
  components: { ItemCard, AddNoteDialog },
};
</script>

<style lang="scss">
.search-field div.v-input__slot{
  margin: 24px 0px 0px 0px !important;
  box-shadow: 0px 5px 5px 0px grey !important;
  border-radius: 8px;
  border: 1.5px solid;
}
</style>