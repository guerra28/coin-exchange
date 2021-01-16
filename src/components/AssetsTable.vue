<template>
  <v-container>
    <v-simple-table>
      <thead>
        <tr>
          <th class="white--text"></th>
          <th class="white--text">
            <span @click="changeSortOrder">Ranking</span>
          </th>
          <th class="white--text">Nombre</th>
          <th class="white--text">Precio</th>
          <th class="white--text">Cap. de mercado</th>
          <th class="white--text">Variación 24Hr</th>
          <td class="white--text">
            <v-text-field
              full-width
              placeholder="Buscar"
              solo
              class="mt-8"
              v-model="filter"
            ></v-text-field>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in filteredAssets" :key="a.id">
          <td>
            <v-img
              height="20"
              width="20"
              :src="
                `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
              "
              :alt="a.name"
            />
          </td>
          <td>
            <b># {{ a.rank }}</b>
          </td>
          <td>
            <router-link
              :to="{ name: 'coin-detail', params: { id: a.id } }"
              class="green--text text--darken-2 font-weight-medium "
            >
              {{ a.name }}
            </router-link>
          </td>
          <td>{{ a.priceUsd | dollar }}</td>
          <td>{{ a.marketCapUsd | dollar }}</td>
          <td
            :class="
              a.changePercent24Hr.includes('-') ? 'red--text' : 'green--text'
            "
          >
            {{ a.changePercent24Hr | percent }}
          </td>
          <td>
            <router-link :to="{ name: 'coin-detail', params: { id: a.id } }">
              <v-btn
                color="success"
                class="blue-grey--text text--lighten-5 text-decoration-none text-capitalize"
              >
                Detalle
              </v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "AssestsTable",

  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    },
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>
<style scoped>
thead {
  background-color: #bdbdbd;
}
</style>
