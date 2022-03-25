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
        <DeleteNoteDialog @confirm-delete="deleteNote"/>
      </v-col>
    </v-row>
    <v-textarea
      solo
      :flat=true
      :no-resize=true
      label="Solo textarea"
      :value="note.content"
      @input="debounceInput"
    ></v-textarea>
    <div> {{ note.createdAt }} </div>
  </div>
</template>

<script>
import DeleteNoteDialog from "~/components/DeleteNoteDialog.vue";
import _ from 'lodash';

export default {
  name: "note-details",
  
  async asyncData({params, $axios}) {
    return await $axios.$get(`notes/${params.id}`)
      .then((result) => {
        return {note: result}
      })
  },
  computed: {},
  methods: {
    deleteNote() {
      this.$store.dispatch("notes/deleteNote", this.note)
      this.$router.push("/")
    },
    debounceInput: _.debounce((e) => {
      console.log("update content")
    }, 500)

  },
  components: { DeleteNoteDialog },
};
</script>