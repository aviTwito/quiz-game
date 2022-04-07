<template>
  <!-- <div class="d-flex align-center justify-center">
   
    <start-game />
  </div> -->
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-expansion-panels flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>Categories</v-expansion-panel-header>
            <v-expansion-panel-content>
              <categories @setCategory="setCategory" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col md="6">
        <start-game @start="start" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Categories from "../components/CategoriesSmall.vue";
import startGame from "../components/StartGame.vue";
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["setUserName", "startGame"]),
    setCategory(category) {
      this.selectedCategory = category;
    },
    start(userName) {
      this.setUserName(userName);
      this.startGame(this.selectedCategory);
      this.$router.push("/game");
    },
  },
  data: () => ({
    selectedCategory: {},
  }),
  components: {
    startGame,
    Categories,
    // Questions,
  },
};
</script>
