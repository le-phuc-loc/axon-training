<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn-add-note" outlined fab v-bind="attrs" v-on="on">
        <v-icon >mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card class="add-note-dialog">
        <v-card-text>
          <v-textarea
            solo
            :flat=true
            :no-resize=true
            label="Solo textarea"
            v-model="value"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn class="" text @click="close()">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
          <v-btn class="" text @click="addNote()">
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>




<script>
export default {
  data() {
    return {
      value: "",
      dialog: false
    };
  },

  methods: {
    addNote() {
      console.log(this.value)
      this.dialog = false
      this.$store.dispatch('notes/addNote', {
        content: this.value
      })
    },

    close() {
      this.dialog = false
    }
  },
};
</script>

<style lang="scss">
.btn-add-note,  .btn-add-note v-icon{
  width: 30px !important;
  height: 30px !important;
}

.add-note-dialog, .add-note-dialog div.v-input__slot {
  background-color: #77a5d0 !important;
}
</style>
