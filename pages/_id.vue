<template>
  <div class="note-details">
    <div class="content d-flex flex-column justify-space-between">
      <div>
        <v-row>
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
          class="content-detail-note"
          solo
          :flat="true"
          :no-resize="true"
          color="#77a5d0"
          label="Type your content"
          :value="note.content"
          @input="debounceInput"
        ></v-textarea>
      </div>

      <div class="created-at-detail-note align-self-end">
        {{ note.createdAt }}
      </div>
    </div>
  </div>
</template>

<script>
import DeleteNoteDialog from "~/components/DeleteNoteDialog.vue";
import _ from "lodash";

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
}

.note-details div.v-input__slot {
  background-color: #77a5d0 !important;
}

.content-detail-note textarea {
  color: #fff !important;
}

.created-at-detail-note {
  text-align: right;
}
</style>