import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const questiosUrl = "https://opentdb.com/api.php?amount=100";
// const questionsByCatgoryUrl =
//   "https://opentdb.com/api.php?amount=100&category=";
const categoriesUrl = "https://opentdb.com/api_category.php";

const defaultCaregory = "Mixed";

export default new Vuex.Store({
  state: {
    questionsFetched: false,
    user: "",
    score: 0,
    answredCorrect: 0,
    answredWrong: 0,
    questions: [],
    categories: [{ id: -1, name: defaultCaregory }],
    selectedCategory: "",
    currentQuestion: null,
  },
  mutations: {
    setQuestiosFetched(state, payload) {
      state.questionsFetched = payload;
    },
    setQuestios(state, payload) {
      state.questions = payload;
      state.questionsFetched = true;
    },
    setCategory(state, paylod) {
      state.selectedCategory = paylod;
      state.qeustions = state.qeustions.filter((x) => x.category === paylod);
    },
    setUser(state, user) {
      state.user = user;
    },
    setCategories(state, payload) {
      state.categories.push(...payload);
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    nextQuestion(state) {
      if (state.questions.length) {
        state.currentQuestion = state.questions.pop();
      }
    },
  },
  actions: {
    async startGame(state, category) {
      state.commit("setQuestiosFetched", false);
      const response =
        category.id == -1
          ? await fetch(questiosUrl)
          : await fetch(`${questiosUrl}&category=${category.id}`);
      const qeustions = await response.json();
      state.commit("setQuestios", qeustions.results);
      state.commit("nextQuestion");
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
      if (category !== defaultCaregory) {
        state.commit("setCategory", category);
      }
    },
    setUserName(state, user) {
      state.commit("setUser", user);
    },
  },
  modules: {},
  getters: {
    getQuestion: (state) => state.currentQuestion,
    getCategories: (state) => state.categories,
  },
});
