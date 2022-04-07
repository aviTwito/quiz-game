<template>
  <v-card shaped outlined color="#3456a8" height="130">
    <v-row no-gutters>
      <v-col>
        <v-card-title class="white--text">Player:{{ user }}</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-divider light></v-divider>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="4" v-text="correctAnsers" :class="columnClassed"></v-col>
        <v-divider vertical></v-divider>
        <v-col cols="4" v-text="wrongAnswers" :class="columnClassed"></v-col>
        <v-divider vertical></v-divider>
        <v-col cols="4" v-text="totalScore" :class="columnClassed"></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      correct: "getCorrectCount",
      wrong: "getWrongCount",
      user: "getUserName",
      score: "getScore",
    }),
    correctAnsers() {
      return `Correct ${this.correct}`;
    },
    wrongAnswers() {
      return `Wrong ${this.wrong}`;
    },
    totalScore() {
      return `Score ${this.score}`;
    },
    columnClassed() {
      return "white--text d-flex justify-center align-center";
    },
  },
};
</script>

<style scoped>
.v-card {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
  background-color: #3456a8;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 5px blue;
  -moz-box-shadow: 0 0 5px blue;
  box-shadow: 0 0 5px blue;
}

.v-divider {
  border-color: white !important;
}
</style>
