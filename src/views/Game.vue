<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12"><stats /> </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12"> <questions @newGame="newGame" /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Questions from "../components/Questions.vue";
import Stats from "../components/Stats.vue";
export default {
  name: "Game",
  components: {
    Questions,
    Stats,
  },
  methods: {
    ...mapActions(["startGame", "endGame", "resetGame"]),
    newGame() {
      console.log("Starting new game");
      this.resetGame();
      this.endGame();
      console.log(this.category);
      this.startGame(this.category);

      this.$forceUpdate();
    },
  },
  computed: {
    ...mapGetters({
      category: "getSelectedCategory",
    }),
  },
  data: () => ({}),
};
</script>
