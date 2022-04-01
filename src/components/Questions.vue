<template>
  <question :question="question" />
</template>

<script>
import Question from "./Question.vue";
import { mapGetters } from "vuex";
export default {
  name: "Questions",
  props: {},
  components: {
    Question,
  },
  computed: {
    ...mapGetters({ question: "getQuestion" }),
  },
  mounted() {
    console.log(this.question);
  },
  data: () => ({
    //
  }),
};
</script>
