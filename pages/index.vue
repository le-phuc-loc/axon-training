<template>
  <div class="main">
    <v-row>
      <v-col :cols="6"> NOTES </v-col>
      <v-col :cols="6" class="text-right">
        <AddNoteDialog />
      </v-col>
    </v-row>
    <v-text-field
      @keyup.enter="addNote"
      label="Type to search ..."
      outlined
      dense
      @input="debounceInput"
    ></v-text-field>

    <v-list three-line>
      <ItemCard v-for="note in notes" :key="note.id" :note="note" />
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
    isLoading: false,
    search_content: "",
    current_contents: [],
  }),

  async fetch({ store }) {
    if (store.getters["notes/getNotes"] !== [] && store.getters["notes/getNotes"].length <= 0) {
      await store.dispatch("notes/init");
      await store.dispatch("notes/fetchNotes", {});
    }
  },

  computed: {
    notes() {
      return this.$store.getters["notes/getNotes"];
    },
  },
  mounted() {
    this.scroll();
  },
  methods: {
    addNote(e) {
      let temp = {
        id: this.notes.length,
        content: e.target.value,
      };
      this.$store.dispatch("notes/storeNotes", temp);
      console.log(this.notes);
      e.target.value = "";
    },

    scroll() {
      window.onscroll = ({store}) => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (!this.$store.getters["notes/isTheLastPage"]) {
            if (
              !this.$route.query.content ||
              this.$route.query.content === ""
            ) {
              this.$store.dispatch("notes/fetchNotes", {
                page_index: this.$store.getters["notes/getCurrentPage"],
              });
            }
          }
        }
      };
    },

    debounceInput: _.debounce((e) => {
      console.log("search content")
    }, 500)
  },
  components: { ItemCard, AddNoteDialog },
};
</script>

<style>
input {
  background-color: white;
}

.main {
  background-color: aquamarine;
  margin: 22px 25px 28px 25px;
}

.note {
  background-color: #77a5d0;
}
</style>