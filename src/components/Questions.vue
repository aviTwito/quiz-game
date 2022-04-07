<template>
  <v-container>
    <v-dialog v-model="finishedDialog">
      <game-finished @startGame="start" />
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <question
          :key="question.question"
          @setAnswer="setAnswerState"
          v-if="question"
          :question="question"
        />
        <!-- <question /> -->
      </v-col>
      <v-col v-if="questionAnswered">
        <v-btn @click="nextQuestion" primary>Next Question</v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import Question from "./Question.vue";
import GameFinished from "./GameFinishedDialog.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Questions",
  props: {},
  components: {
    Question,
    GameFinished,
  },
  computed: {
    ...mapGetters({
      question: "getQuestion",
      questionCount: "getQuestionsCount",
    }),
  },
  methods: {
    ...mapActions(["nextQuestion", "setAnswer"]),
    setAnswerState(answer) {
      answer.answer === this.question.correct_answer
        ? this.setAnswer({ isCorrect: true, score: answer.score })
        : this.setAnswer({ isCorrect: false, score: undefined });
      this.questionAnswered = true;
      if (this.questionCount === 0) {
        setTimeout(() => {
          this.finishedDialog = true;
        }, 2000);
      }
    },
    start() {
      this.finishedDialog = false;
      console.log("emitting new game");
      this.$emit("newGame");
    },
  },

  watch: {
    question() {
      this.questionAnswered = false;
    },
  },
  data: () => ({
    questionAnswered: false,
    finishedDialog: false,
  }),
};
</script>
