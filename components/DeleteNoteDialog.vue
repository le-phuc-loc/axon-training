<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="btn-delete-note"
        icon
        v-bind="attrs"
        v-on="on"
        :retain-focus-on-click=true
        :depressed=true
        @click="e => e.stopPropagation()"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card class="delete-dialog">
        <v-card-text class="text-center"> Are you sure you want to delete?</v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn class="" icon @click="dialog.value = false">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
          <v-btn class="" icon @click="onConfirmDeleteNote">
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>




<script>
export default {
  name: "DeleteNoteDialog",
  props: ['deletedNote'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    onConfirmDeleteNote() {
      this.$emit('confirm-delete')
      this.dialog = false
    },
    
  },
  
};
</script>

<style lang="scss">
.btn-delete-note{
  width: 30px !important;
  height: 30px !important;
}

.delete-dialog {
  background-color: #C4C4C4 !important;
}

.delete-dialog .v-card__text.text-center{
  color: #000;
  font-size: 18px !important;
}
</style>