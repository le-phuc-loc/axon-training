<template>
  <v-dialog v-model="dialog" max-width="296">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn-add-note" @click="initContent" outlined fab v-bind="attrs" v-on="on">
        <v-icon >mdi-plus</v-icon>
      </v-btn>
    </template>
    <template>
      <v-card class="add-note-dialog">
        <v-card-text>
          <v-textarea
            solo
            :flat=true
            :no-resize=true
            label="Type something ..."
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
    },

    initContent() {
        this.value = ""
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

.add-note-dialog {
    border-radius: 8px !important;
}

.add-note-dialog div.v-card__text {
    height: 369px;
}

.add-note-dialog textarea {
    color: #fff !important
}

</style>
