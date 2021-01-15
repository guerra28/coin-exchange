const url = "https://api.coincap.io/v2"


module.exports = {

    getAssets: () => {
        return fetch(`${url}/assets?limit=20`)
            .then(res => res.json())
            .then(res => res.data)


    },

    getAsset: (coin) => {
        return fetch(`${url}/assets/${coin}`)
            .then(res => res.json())
            .then(res => res.data)
    },
    getAssetHistory: (coin) => {
        const now = new Date()
        const end = now.getTime()
        now.setDate(now.getDate() - 1)
        const start = now.getTime()

        return fetch(
                `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
            )
            .then(res => res.json())
            .then(res => res.data)
    },
    getMarkets: (coin) => {
        return fetch(`${url}/assets/${coin}/markets?limit=5`)
            .then(res => res.json())
            .then(res => res.data)
    },
    getExchange: (id) => {
        return fetch(`${url}/exchanges/${id}`)
            .then(res => res.json())
            .then(res => res.data)
    }
}