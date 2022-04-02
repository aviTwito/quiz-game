<template>
  <v-container>
    <questions />
  </v-container>
</template>

<script>
import Questions from "../components/Questions.vue";
export default {
  name: "Game",
  components: {
    Questions,
  },
  data: () => ({}),
};
</script>
