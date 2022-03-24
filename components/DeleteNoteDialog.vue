<template>
  <v-dialog transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="#77a5d0"
        :retain-focus-on-click=true
        :depressed=true
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-text> Are you sure you want to delete? </v-card-text>
        <v-card-actions class="justify-content-between">
          <v-btn class="" text @click="dialog.value = false">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
          <v-btn class="" text @click="dialog.value = false">
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
      dialog: false,
    };
  },
};
</script>