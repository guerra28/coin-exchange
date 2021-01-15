<template>
  <div>
    <v-container class="d-flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </v-container>

    <template v-if="!isLoading">
      <div class="d-flex flex-row mt-10 justify-space-around">
        <div
          class="d-flex flex-column justify-space-around align-center my-10 mx-10 "
        >
          <v-img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            width="100"
            height="100"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="grey--text">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 d-flex justify-center ">
          <ul>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Ranking</b>
              <span class="font-weight-medium">#{{ asset.rank }}</span>
            </li>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Precio actual</b>
              <span class="font-weight-medium">{{
                asset.priceUsd | dollar
              }}</span>
            </li>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Precio más bajo</b>
              <span class="font-weight-medium">{{ min | dollar }}</span>
            </li>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Precio más alto</b>
              <span class="font-weight-medium">{{ max | dollar }}</span>
            </li>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Precio Promedio</b>
              <span class="font-weight-medium">{{ avg | dollar }}</span>
            </li>
            <li class="d-flex justify-space-between">
              <b class="grey--text mr-10 ">Variación 24hs</b>
              <span class="font-weight-medium">{{
                asset.changePercent24Hr | percent
              }}</span>
            </li>
          </ul>
        </div>

        <div class=" d-flex flex-column  justify-center">
          <v-btn color="success" @click="toggleConverter">
            <b>
              {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD ` }}
            </b>
          </v-btn>

          <div class="mt-4">
            <v-text-field
              v-model="convertValue"
              id="convertValue"
              error
              solo
              :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
            />
          </div>

          <span class="text-xl d-flex justify-center"
            >{{ convertResult }}
            {{ fromUsd ? asset.symbol : "USD" }}
          </span>
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />

      <h3 class=" mx-10 my-10">Mejores Ofertas de Cambio</h3>
      <v-simple-table>
        <tr
          v-for="m in markets"
          :key="`{$m.exchangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <v-btn
              v-if="!m.url"
              @click="getWebSite(m)"
              color="success"
              class="blue-grey--text text--lighten-5 text-decoration-none text-capitalize"
            >
              Obtener link
            </v-btn>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{ m.url }}
            </a>
          </td>
        </tr>
      </v-simple-table>
    </template>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "CoinDetail",

  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;

      return result.toFixed(4);
    },

    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return Math.abs(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
  },

  watch: {
    $route() {
      this.getCoin();
    },
  },

  created() {
    this.getCoin();
  },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getWebSite(exchange) {
      return api.getExchange(exchange.exchangeId).then((res) => {
        this.$set(exchange, "url", res.exchangeUrl);
      });
    },

    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
