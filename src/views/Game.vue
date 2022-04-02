<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12"><stats /> </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12"> <questions /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Questions from "../components/Questions.vue";
import Stats from "../components/Stats.vue";
export default {
  name: "Game",
  components: {
    Questions,
    Stats,
  },
  data: () => ({}),
};
</script>
