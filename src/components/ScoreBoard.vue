<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialogClosed">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar-title>Score Board</v-toolbar-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="scoreBoard"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      scoreBoard: "getScoreTable",
    }),
  },

  methods: {
    dialogClosed() {
      this.$emit("dialogClosed");
    },
  },
  data: () => ({
    headers: [
      {
        text: "Player",
        align: "start",
        value: "user",
      },
      {
        text: "Category",
        align: "start",
        value: "category",
      },
      {
        text: "Score",
        align: "start",
        value: "score",
      },
    ],
  }),
};
</script>

<style scoped></style>
