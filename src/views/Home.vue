<template>
  <!-- <div class="d-flex align-center justify-center">
   
    <start-game />
  </div> -->
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col md="6">
        <categories @setCategory="setCategory" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col md="6">
        <start-game @start="startGame" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import Questions from "../components/Questions.vue";
import Categories from "../components/CategoriesSmall.vue";
import startGame from "../components/StartGame.vue";
export default {
  name: "Home",
  methods: {
    setCategory(category) {
      this.selectedCategory = category;
    },
    startGame(userName) {
      console.log(userName);
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
