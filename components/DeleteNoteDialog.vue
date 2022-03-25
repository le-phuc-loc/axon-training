<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        :retain-focus-on-click=true
        :depressed=true
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-text> Are you sure you want to delete?</v-card-text>
        <v-card-actions class="justify-content-between">
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