<template>
  <v-app>
    <v-app-bar app flat color="primary">
      <v-toolbar-title class="white--text">Monday-U Quiz Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="secondary">Score Board</v-btn>
      <v-btn icon color="white">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("setCategories");
  },
  data: () => ({
    //
  }),
};
</script>
