<template>
  <v-card outlined elevation="5">
    <v-card-title class="justify-center">Start New Game</v-card-title>

    <v-card-text class="text-center">
      <v-text-field
        v-model="user"
        label="Enter your name"
        outlined
        clearable
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn @click="startGame"> Start Game </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "StartGame",
  props: {},

  data: () => ({
    user: "",
  }),
  methods: {
    startGame() {
      this.$emit("start", this.user);
    },
  },
};
</script>
