<template>
  <div>
    <v-row>
      <v-col :cols="6">
        <v-btn
          color="#77a5d0"
          :retain-focus-on-click=true
          :depressed=true
          :to="`/`"
          nuxt
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col :cols="6" class="text-right">
        <DeleteNoteDialog />
      </v-col>
    </v-row>
    <v-textarea
      solo
      :flat=true
      :no-resize=true
      label="Solo textarea"
      :value="note.content"
    ></v-textarea>
    <div> {{ note.createdAt }} </div>
  </div>
</template>

<script>
import DeleteNoteDialog from "~/components/DeleteNoteDialog.vue";
export default {
  name: "note-details",
  data: () => {
    return {
      note: {
        id: 2,
        content: "hello",
        created_date: "22/11/2222",
      },
    };
  },
  computed: {},
  components: { DeleteNoteDialog },
};
</script>