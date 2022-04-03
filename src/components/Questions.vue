<template>
  <v-row>
    <v-col cols="12">
      <!-- <question
        :key="question.question"
        @setAnswer="setAnswerState"
        v-if="question"
        :question="question"
      /> -->
      <question />
    </v-col>
    <v-col v-if="questionAnswered">
      <v-btn @click="nextQuestion" primary>Next Question</v-btn></v-col
    >
  </v-row>
</template>

<script>
import Question from "./Question.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Questions",
  props: {},
  components: {
    Question,
  },
  computed: {
    ...mapGetters({ question: "getQuestion" }),
  },
  methods: {
    ...mapActions(["nextQuestion", "setAnswer"]),
    setAnswerState(answer) {
      answer === this.question.correct_answer
        ? this.setAnswer(true)
        : this.setAnswer(false);
      this.questionAnswered = true;
    },
  },
  watch: {
    question() {
      this.questionAnswered = false;
    },
  },
  data: () => ({
    questionAnswered: false,
  }),
};
</script>
