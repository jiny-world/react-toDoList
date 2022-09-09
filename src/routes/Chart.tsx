import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IChart {
  coinId: string;
}

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChart) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data: priceData } = useQuery<IHistory[]>(
    "coinHistory",
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10 * 1000,
    }
  );

  const exceptData = priceData ?? [];
  console.log("exceptData : ", exceptData);
  const chartData = exceptData?.map((data) => {
    return {
      x: Number(data.time_close),
      y: [
        Number(data.open),
        Number(data.high),
        Number(data.low),
        Number(data.close),
      ],
    };
  });
  return (
    <div>
      {isLoading ? (
        "Loading Chart ..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Percent Change",
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },

            yaxis: {
              // show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              // labels: { show: false },
              type: "datetime",
              categories: priceData?.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
