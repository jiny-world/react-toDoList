const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  console.log("fetchCoins");
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  console.log("fetchCoinInfo");

  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  console.log("fetchCoinTickers");

  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  console.log("fetchCoinHistory");

  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
}
