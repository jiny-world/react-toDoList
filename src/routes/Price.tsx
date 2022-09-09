import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import ApexChart from "react-apexcharts";

interface IPrice {
  coinId: string;
  USD: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

function Price({ coinId, USD }: IPrice) {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      <ApexChart
        type="line"
        series={[
          {
            name: "Percent Change",
            data: [
              USD.percent_change_1y,
              USD.percent_change_30d,
              USD.percent_change_7d,
              USD.percent_change_24h,
              USD.percent_change_12h,
              USD.percent_change_6h,
              USD.percent_change_1h,
              USD.percent_change_30m,
              USD.percent_change_15m,
            ],
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
          stroke: {
            curve: "smooth",
            width: 4,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            categories: [
              "1y",
              "30d",
              "7d",
              "24h",
              "12h",
              "6h",
              "1h",
              "30m",
              "15m",
            ],
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          },
          colors: ["#0fbcf9"],
        }}
      />
    </div>
  );
}

export default Price;
