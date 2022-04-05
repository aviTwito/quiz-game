<template>
  <div>
    <v-card elevation="10" color="#a3abbf" class="ma-0 pa-0" flat>
      <v-card shaped flat rounded outlined color="primary">
        <v-row align="center">
          <v-col cols="9">
            <v-card-title class="white--text">{{
              question.category
            }}</v-card-title>
          </v-col>
          <v-col cols="3">
            <v-chip
              v-text="question.difficulty"
              :color="difficultyColor"
            ></v-chip>
          </v-col>
        </v-row>
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
            <transition-group name="list-item">
              <v-list-item
                :disabled="lockSelection"
                class="answer-option white--text panel"
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
            </transition-group>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <div class="action-buttons rounded-tr-xl">
        <v-card-actions>
          <v-btn :disabled="fifthyFifthyUsed" @click="handleFifthyFiftyh"
            >50/50</v-btn
          >
          <v-btn> <v-icon>mdi-timer </v-icon>+ </v-btn>
          <v-spacer />
          <vac class="circle" :left-time="30000">
            <span
              class="white--text text-h5"
              slot="process"
              slot-scope="{ timeObj }"
            >
              {{ timeObj.ceil.s }}
            </span>
          </vac>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mdiCameraTimer } from "@mdi/js";
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      default: () => {
        return {
          score: 0,
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
    difficultyColor() {
      let color = "";
      switch (this.question.difficulty) {
        case "easy":
          color = "success";
          break;
        case "medium":
          color = "warning";
          break;
        case "hard":
          color = "error";
          break;
      }
      return color;
    },
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
    setInitialScore(difficulty) {
      switch (difficulty) {
        case "easy":
          this.score = 50;
          break;
        case "medium":
          this.score = 100;
          break;
        case "hard":
          this.score = 150;
          break;
      }
    },
    handleFifthyFiftyh() {
      let index = Math.round(Math.random() * 2);
      this.question.incorrect_answers.splice(index, 1);
      index = Math.round(Math.random() * 1);
      this.question.incorrect_answers.splice(index, 1);
      this.score /= 2;
      this.fifthyFifthyUsed = true;
    },
    handleSelection(selectedAnser) {
      this.lockSelection = true;
      this.fifthyFifthyUsed = true;
      this.$emit("setAnswer", {
        answer: this.shuffledAnsers[selectedAnser],
        score: this.score,
      });
    },
  },
  mounted() {
    this.setInitialScore(this.question.difficulty);
  },
  data: () => ({
    fifthyFifthyUsed: false,
    score: 1000,
    icons: {
      mdiCameraTimer,
    },
    selectedItem: "",
    lockSelection: false,
  }),
};
</script>

<style scoped>
.panel {
  transition: all 0.3s ease-out;
}

.remove {
  float: right;
  cursor: pointer;
  text-decoration: underline;
  font-size: 12px;
  vertical-align: bottom;
}

.list-item-enter,
.list-item-leave-to {
  opacity: 0;
}

.list-item-enter {
  transform: translateY(10%);
}

.list-item-leave-to {
  /* transform: translateX(10%); */
  transform: skew(300%);
}

.list-item-leave-active {
  position: relative;
}

.action-buttons {
  border: 1px solid white;
  background-color: #3456a8;
}

.circle {
  display: inline-block;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  border: 1px solid white;
  color: white;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
}
.circle:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  padding-top: 100%;
  height: 0;
}
.circle span {
  display: inline-block;
  vertical-align: middle;
}

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

.smooth-item {
  overflow: visible;
  transition: all 1s;
  display: block;
}

.smooth-enter {
  opacity: 0;
}

.smooth-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.smooth-leave-active {
  position: absolute;
}

.smooth-move {
  transition: transform 1s;
}
</style>
