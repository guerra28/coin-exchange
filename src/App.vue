<template>
  <v-app>
    <px-header :links="links"></px-header>
    <router-view class="mx-16 mt-10" />
  </v-app>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  name: "App",

  components: {
    PxHeader,
  },

  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } },
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } },
        },
        {
          title: "XRP",
          to: { name: "coin-detail", params: { id: "xrp" } },
        },
      ],
    };
  },
};
</script>
