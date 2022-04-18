import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const questiosUrl = "https://opentdb.com/";
// const questionsByCatgoryUrl =
//   "https://opentdb.com/api.php?amount=100&category=";
const categoriesUrl = "https://opentdb.com/api_category.php";

const defaultCaregory = "Mixed";

export default new Vuex.Store({
  state: {
    numberOfQuestionToFetch: 50,
    scoreTable: [],
    categoriesFetched: false,
    questionsFetched: false,
    user: "",
    score: 0,
    totalQuestions: 0,
    answredCorrect: 0,
    answredWrong: 0,
    questions: [],
    categories: [],
    selectedCategory: "",
    currentQuestion: null,
  },
  mutations: {
    resetGame(state) {
      state.score = 0;
      state.totalQuestions = 0;
      state.answredCorrect = 0;
      state.answredWrong = 0;
    },
    setQuestiosFetched(state, payload) {
      state.questionsFetched = payload;
    },
    setQuestios(state, payload) {
      state.questions = payload;
      state.totalQuestions = payload.length;
      state.questionsFetched = true;
      state.score = 0;
    },
    setCategory(state, paylod) {
      state.selectedCategory = paylod;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCategories(state, payload) {
      state.categories.push({ id: -1, name: defaultCaregory });
      state.categories.push(...payload);
      state.categoriesFetched = true;
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    nextQuestion(state) {
      if (state.questions.length) {
        state.currentQuestion = state.questions.pop();
      }
    },
    setAnswer(state, { isCorrect, score }) {
      if (isCorrect) {
        state.score += score;
        state.answredCorrect++;
      } else {
        state.answredWrong++;
      }
    },
    endGame(state) {
      state.scoreTable.push({
        user: state.user,
        category: state.selectedCategory.name,
        score: state.score,
      });
    },
    setNumberOfQuestions(state, numberOfQuestions) {
      state.numberOfQuestionToFetch = numberOfQuestions;
    },
  },
  actions: {
    setNumberOfQuestions(state, numberOfQuestions) {
      state.commit("setNumberOfQuestions", numberOfQuestions);
    },
    resetGame(state) {
      state.commit("resetGame");
    },
    endGame(state) {
      state.commit("endGame");
    },
    setAnswer(state, { isCorrect, score }) {
      state.commit("setAnswer", { isCorrect, score });
    },
    async startGame({ commit, state }, category) {
      commit("setCategory", category);
      commit("setQuestiosFetched", false);
      const response =
        category.id == -1
          ? await fetch(
              `${questiosUrl}api.php?amount=${state.numberOfQuestionToFetch}`
            )
          : await fetch(
              `${questiosUrl}api.php?amount=${state.numberOfQuestionToFetch}&category=${category.id}`
            );

      const qeustions = await response.json();
      commit("setQuestios", qeustions.results);
      commit("nextQuestion");
    },
    nextQuestion(state) {
      state.commit("nextQuestion");
    },
    async setQuestios(state) {
      state.commit("setQuestiosFetched", false);
      const response = await fetch(questiosUrl);
      const qeustions = await response.json();
      state.commit("setQuestios", qeustions.results);
    },
    async setCategories(state) {
      const response = await fetch(categoriesUrl);
      const categories = await response.json();
      state.commit("setCategories", categories.trivia_categories);
    },
    removeQeustion(state) {
      if (state.qeustions.length === 0) {
        state.dispatch("setQuestios");
      } else {
        state.qeustions.pop();
      }
    },
    setCategory(state, category) {
      state.commit("setCategory", category);
    },
    setUserName(state, user) {
      state.commit("setUser", user);
    },
  },
  modules: {},
  getters: {
    getCategoriesFetched: (state) => state.categoriesFetched,
    getWrongCount: (state) => state.answredWrong,
    getCorrectCount: (state) => state.answredCorrect,
    getQuestion: (state) => state.currentQuestion,
    getCategories: (state) => state.categories,
    getUserName: (state) => state.user,
    getScore: (state) => state.score,
    getScoreTable: (state) => state.scoreTable,
    getQuestionsCount: (state) => state.questions.length,
    getSelectedCategory: (state) => state.selectedCategory,
  },
});
