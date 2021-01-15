<template>
  <div>
    <v-app-bar class="green darken-2" dark height="100">
      <img src="@/assets/logo.svg" alt="" height="30px" class="mr-4" />
      <router-link
        :to="{ name: 'home' }"
        class="title blue-grey--text text--lighten-5 text-decoration-none font-weight-bold"
        >Platzi Exchange</router-link
      >

      <div>
        <router-link
          v-for="l in links"
          :key="l.title"
          :to="l.to"
          class="ml-4 text text-decoration-none grey--text text--lighten-1 font-weight-bold"
        >
          {{ l.title }}
        </router-link>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "PxHeader",

  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
