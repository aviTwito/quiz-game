<template>
  <v-app>
    <v-app-bar app flat color="primary">
      <v-toolbar-title class="white--text">Monday-U Quiz Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="scoreBoarDialog = true" small color="secondary"
        >Score Board</v-btn
      >
      <v-btn icon color="white">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="scoreBoarDialog"
    >
      <score-board @dialogClosed="closeDialog" />
    </v-dialog>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ScoreBoard from "../src/components/ScoreBoard.vue";
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("setCategories");
  },
  components: {
    ScoreBoard,
  },
  methods: {
    closeDialog() {
      this.scoreBoarDialog = false;
    },
  },
  data: () => ({
    scoreBoarDialog: false,
  }),
};
</script>
