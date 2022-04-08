<template>
  <v-card outlined>
    <v-card-title>Settings</v-card-title>
    <v-row no-gutters justify="center" align="center">
      <v-col class="d-flex align-center justify-center" cols="5">
        <v-card-subtitle>Number of questions</v-card-subtitle>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="7">
        <v-card-text>
          <v-slider
            thumb-size="25"
            :min="min"
            :max="max"
            v-model="value"
            :step="steps"
            ticks
            :hint="hintLabel"
            thumb-label="always"
          ></v-slider>
        </v-card-text>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-btn @click="set" color="primary">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setNumberOfQuestions"]),
    set() {
      this.setNumberOfQuestions(this.value);
      this.$emit("settingSet");
    },
  },
  computed: {
    hintLabel() {
      return "Select between 5-50";
    },
  },
  data() {
    return {
      value: 5,
      min: 5,
      max: 50,
      steps: 5,
    };
  },
};
</script>

<style scoped></style>
