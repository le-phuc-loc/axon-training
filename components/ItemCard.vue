<template>
  <v-list-item class="item-note" v-on:click.prevent="navigateToDetail()">
    <div class="item-note-content d-flex flex-column">
      <div class="d-flex flex-row justify-content-between">
        <v-list-item-content>
          <v-list-item-subtitle class="note-text" v-text="note.content">
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <DeleteNoteDialog @confirm-delete="deleteNote" />
        </v-list-item-action>
      </div>
      <v-list-item-subtitle class="text-right" v-text="note.createdAt">
      </v-list-item-subtitle>
    </div>
  </v-list-item>
</template>

<script>
import DeleteNoteDialog from "./DeleteNoteDialog.vue";
export default {
  name: "ItemCard",
  props: ["note"],
  methods: {
    deleteNote() {
      console.log("aosjdoiasjiodjiasjd")
      this.$store.dispatch("notes/deleteNote", this.note);
    },
    navigateToDetail() {
      this.$router.push(`/${this.note.id}`)
    }
  },
  components: { DeleteNoteDialog },
};
</script>


<style lang="scss">
.item-note {
  border: 0px !important;
  box-shadow: 0px !important;
  margin: 0px 0px 34px 0px !important;
  background-color: #77a5d0 !important;
  border-radius: 8px !important;
}

.note-text {
  font-size: 14px !important;
  text-align: left !important;
  color: #fff !important;
}

v-list-item-content {
  margin: 0px !important;
  padding: 0px !important;
}

.v-list-item__content {
  align-items: flex-start !important;
}

v-list-item-action {
  align-items: flex-start !important;
}

.item-note-content {
  width: 100%;
}
</style>

