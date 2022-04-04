<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="6" lg="5">
        <v-sheet elevation="10" rounded="xl">
          <v-sheet class="pa-3 primary text-right" dark rounded="t-xl">
            <h5 class="text-left">Select Category</h5>
          </v-sheet>

          <div class="pa-4">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="table-row-divider"
              v-if="!categoriesFetched"
            ></v-skeleton-loader>
            <v-chip-group
              v-model="selection"
              mandatory
              active-class="primary--text"
              column
            >
              <v-chip v-for="tag in categories" :key="tag.id">
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      categories: "getCategories",
      categoriesFetched: "getCategoriesFetched",
    }),
  },
  data: () => ({
    selection: "",
  }),
  watch: {
    selection(newVal) {
      this.$emit("setCategory", this.categories[newVal]);
    },
  },
};
</script>
