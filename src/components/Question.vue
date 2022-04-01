<template>
  <v-card>
    <v-card-title>{{ question.category }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      default: () => {
        return {
          category: "sdsf",
          type: "",
          difficulty: "",
          question: "",
          correct_answer: "",
          incorrect_answers: [],
        };
      },
    },
  },
  mounted() {
    console.log(this.question);
  },
  data: () => ({
    //
  }),
};
</script>
