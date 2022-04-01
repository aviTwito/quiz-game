import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const questiosUrl = "https://opentdb.com/api.php?amount=100";
// const questionsByCatgoryUrl = "https://opentdb.com/api_count.php?category=";
const categoriesUrl = "https://opentdb.com/api_category.php";

const defaultCaregory = "Mixed";

export default new Vuex.Store({
  state: {
    user: "",
    score: 0,
    answredCorrect: 0,
    answredWrong: 0,
    questions: [],
    categories: [],
    selectedCategory: "",
  },
  mutations: {
    setQuestios(state, payload) {
      state.questions = payload;
    },
    setCategory(state, paylod) {
      state.selectedCategory = paylod;
      state.qeustions = state.qeustions.filter((x) => x.category === paylod);
    },
    setUser(state, user) {
      state.user = user;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    startGame(category) {},
    async setQuestios(state) {
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
    getQuestion: (state) =>
      state.questions.length ? state.questions[0] : undefined,
    getCategories: (state) => state.categories,
  },
});
