<template>
  <v-container class="d-flex justify-center">
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <assets-table v-if="!isLoading" :assets="assets"> </assets-table>
  </v-container>
</template>

<script>
import api from "@/api";
import AssetsTable from "@/components/AssetsTable";

export default {
  name: "Home",
  components: { AssetsTable },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
