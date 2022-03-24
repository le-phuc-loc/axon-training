<template>
  <div class="main">
    <v-row>
      <v-col :cols="6"> NOTES </v-col>
      <v-col :cols="6" class="text-right">
        <AddNoteDialog/>
        
      </v-col>
    </v-row>
    <v-text-field
      @keyup.enter="addNote"
      label="Type to search ..."
      outlined
      dense
    ></v-text-field>

    <v-list three-line >
      <ItemCard v-for="note in notes" :key="note.id" :note="note" />
    </v-list>
  </div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue";
import AddNoteDialog from "../components/AddNoteDialog.vue";
export default {
    name: "note",
    created() {
      this.$store.dispatch("notes/init");
    },
    computed: {
        notes() {
          return this.$store.getters["notes/getNotes"];
        },
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

        changeToDetail() {
          console.log("asdasd");
        }
    },
    components: { ItemCard, AddNoteDialog }
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