<template>
  <v-card  elevation="0" color="#77a5d0" :to="`/${note.id}`" nuxt>
    <v-card-content>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle 
            class="text--primary"
            v-text="note.content"
          >
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
              <DeleteNoteDialog/>
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="text-right" > {{note.createdAt}}  </v-card-text>
    </v-card-content>
  </v-card>
</template>

<script>
import DeleteNoteDialog from "./DeleteNoteDialog.vue";
export default {
    name: "ItemCard",
    props: ["note"],
    components: { DeleteNoteDialog }
}
</script>

<style>
.nuxt-logo {
  height: 180px;
}


</style>
