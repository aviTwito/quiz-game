<template>
  <v-container>
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="scoreBoarDialog"
    >
      <score-board @dialogClosed="closeDialog" />
    </v-dialog>
    <v-card outlined class="white--text" color="#a3abbf">
      <v-card-title>Game Finished</v-card-title>
      <v-card-text class="white--text">
        <v-row align="center" justify="center">
          <v-col class="d-flex align-center justify-center" cols="6"
            >Total Questions
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >{{ wrong + correct }}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >Correct Answers
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >{{ correct }}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >Wrong Answers
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >{{ wrong }}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >Score
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="6"
            >{{ score }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row align="center">
          <v-col cols="6">
            <v-btn class="white--text" color="#3456a8">Home</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn @click="newGame" class="white--text" color="#3456a8"
              >Play Again</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="scoreBoarDialog = true"
              class="white--text"
              color="#3456a8"
              >Score Board</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ScoreBoard from "./ScoreBoard.vue";
export default {
  components: {
    ScoreBoard,
  },
  computed: {
    ...mapGetters({
      category: "getSelectedCategory",
      correct: "getCorrectCount",
      wrong: "getWrongCount",
      user: "getUserName",
      score: "getScore",
    }),
  },
  methods: {
    newGame() {
      this.$emit("startGame");
    },
    closeDialog() {
      this.scoreBoarDialog = false;
    },
  },
  data: () => ({
    scoreBoarDialog: false,
  }),
};
</script>

<style scoped></style>
