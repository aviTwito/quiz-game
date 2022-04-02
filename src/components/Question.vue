<template>
  <div>
    <v-card color="#a3abbf" class="ma-0 pa-0" flat>
      <v-card shaped flat rounded outlined color="primary">
        <v-card-title class="white--text">{{ question.category }}</v-card-title>
      </v-card>
      <v-card-title
        style="word-break: break-word"
        class="white--text wrap--text"
        v-text="question.question"
      >
      </v-card-title>
      <v-card-text>
        <v-list color="#a3abbf" class="pl-2">
          <v-list-item-group
            class="white--text"
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              :disabled="lockSelection"
              class="answer-option white--text"
              :class="handleClass(i)"
              v-for="(item, i) in shuffledAnsers"
              :key="i"
              @click="handleSelection(i)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
              <v-spacer />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      default: () => {
        return {
          category: "Geography",
          type: "multiple",
          difficulty: "easy",
          question:
            "Which city is the capital of the United States of America?",
          correct_answer: "Washington D.C",
          incorrect_answers: ["Seattle", "Albany", "Los Angeles"],
        };
      },
    },
  },
  computed: {
    shuffledAnsers() {
      const allAnsers = [
        this.question.correct_answer,
        ...this.question.incorrect_answers,
      ];
      return allAnsers
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    handleClass() {
      const context = this;
      return function (index) {
        let temp = "";
        if (this.lockSelection) {
          const correctIndex = context.shuffledAnsers.findIndex(
            (x) => x == context.question.correct_answer
          );
          if (context.selectedItem === index && correctIndex !== index)
            temp = "wrong-answer";
          if (correctIndex === index) temp = "correct-answer";
        }
        return temp;
      };
    },
  },
  methods: {
    handleSelection(selectedAnser) {
      this.lockSelection = true;
      this.$emit("setAnswer", this.shuffledAnsers[selectedAnser]);
    },
  },

  data: () => ({
    selectedItem: "",
    lockSelection: false,
  }),
};
</script>

<style scoped>
.answer-option {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
  background-color: #3456a8;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 5px blue;
  -moz-box-shadow: 0 0 5px blue;
  box-shadow: 0 0 5px blue;
}

.correct-answer {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
  background-color: green;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 25px green;
  -moz-box-shadow: 0 0 25px green;
  box-shadow: 0 0 25px green;
}

.wrong-answer {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
  background-color: red;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 25px red;
  -moz-box-shadow: 0 0 25px red;
  box-shadow: 0 0 25px red;
}
</style>
