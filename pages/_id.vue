<template>
  <div class="note-details">
    <div class="content d-flex flex-column">
      <div class="content-detail-note d-flex flex-column flex-grow-1">
        <v-row class="align-start flex-grow-0">
          <v-col :cols="6">
            <v-btn
              color="#77a5d0"
              :retain-focus-on-click="true"
              :depressed="true"
              :to="`/`"
              nuxt
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col :cols="6" class="text-right">
            <DeleteNoteDialog @confirm-delete="deleteNote" />
          </v-col>
        </v-row>
        <v-textarea
          class="content-detail-note-textarea flex-grow-1"
          solo
          :flat="true"
          :no-resize="true"
          color="#77a5d0"
          label="Type your content"
          :value="note.content"
          @input="debounceInput"
          rows="25"
        ></v-textarea>
        
      </div>

      <div class="created-at-detail-note flex-grow-0">
        {{ note.createdAt }}
      </div>
    </div>
  </div>
</template>

<script>
import DeleteNoteDialog from "~/components/DeleteNoteDialog.vue";

export default {
  name: "note-details",
  data: () => ({
    timeOut: null,
  }),

  async asyncData({ params, $axios }) {
    return await $axios.$get(`notes/${params.id}`).then((result) => {
      return { note: result };
    });
  },
  computed: {},
  methods: {
    deleteNote() {
      this.$store.dispatch("notes/deleteNote", this.note);
      this.$router.push("/");
    },

    debounceInput(e) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$store.dispatch("notes/updateNote", {
          id: this.note.id,
          content: e,
        });
      }, 500);
    },
  },
  components: { DeleteNoteDialog },
};
</script>

<style lang="scss">
.note-details {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #77a5d0;
}

.note-details .content {
  padding: 12px;
  height: 100% !important;
}

.note-details div.v-input__slot {
  background-color: #77a5d0 !important;
}

.content-detail-note textarea {
  color: #fff !important;
}

.created-at-detail-note {
  // position: absolute;
  // bottom: 12px;
  // right: 12px;
  text-align: right;
  color: #5A4F4F;
  font-size: 12px;
}

div.container {
  padding: 0px !important;
}

.content-detail-note-textarea .v-input__control{
  flex:1
}

</style>