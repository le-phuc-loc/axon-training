<template>
  <v-card class="card-note" :to="`/${note.id}`" nuxt>
    <v-card-subtitle >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="note-text" v-text="note.content">
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <DeleteNoteDialog @confirm-delete="deleteNote" />
        </v-list-item-action>
      </v-list-item>
    </v-card-subtitle>
    <v-card-text class="text-right note-created-at"> {{ note.createdAt }} </v-card-text>
  </v-card>
</template>

<script>
import DeleteNoteDialog from "./DeleteNoteDialog.vue";
export default {
    name: "ItemCard",
  props: ["note"],
  methods: {
    deleteNote() {
      this.$store.dispatch("notes/deleteNote", this.deletedNote)
    },
    
  },
  components: { DeleteNoteDialog },
};
</script>


<style lang="scss">
.card-note {
  border: 0px !important;
  box-shadow: 0px !important;
  margin: 17px 0px !important;
  background-color: #77A5D0 !important;
}

.note-text {
  font-size: 14px !important;
  text-align: left !important;
  color: #fff !important;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px !important;
}

v-list-item-content {
  margin: 0px !important;
  padding: 0px !important;
}

.v-sheet.v-card {
  height: 79px;
  border-radius: 8px !important;
}

.v-list-item__content {
  align-items: flex-start !important;
}

.note-created-at{
  padding: 0px 10px 20px 0px !important;
}

</style>

