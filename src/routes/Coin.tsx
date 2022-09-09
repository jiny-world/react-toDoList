import {
  useParams,
  useLocation,
  Switch,
  Route,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { InfiniteQueryObserver, useQuery } from "react-query";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { isPropertySignature } from "typescript";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  button {
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    border: 0px;
    font-size: 13px;
    span {
      font-size: 10px;
    }
  }
  button :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 270%;
`;

const Loader = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

const Overview = styled.div`
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.boxBgColor};
`;

const OverviewItem = styled.span`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px auto;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxBgColor};
  padding: 10px 10px;
  border-radius: 12px;
  a {
    display: block;
  }
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
const HomeBtn = styled.span`
  display: flex;
  justify-content: center;
`;

interface Params {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
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
  };
}
interface IisDarkAtom {
  isDark: boolean;
}
function Coin() {
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: ticekrsLoading, data: tickersData } =
    useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || ticekrsLoading;

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkAtom);

  const changeTheme = () => {
    setIsDarkMode((prev) => !prev);
    console.log(isDarkMode);
  };
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading ... " : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <HomeBtn>
          <Link to="/">
            <FontAwesomeIcon icon={faHouseChimney} />
          </Link>
        </HomeBtn>
        <Title>
          {state?.name ? state.name : loading ? "Loading ... " : infoData?.name}
        </Title>
        <button onClick={changeTheme}>
          {isDarkMode ? (
            <>
              <FontAwesomeIcon icon={faLightbulb} />
              <span> Light Mode </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faMoon} />
              <span> Dark Mode </span>
            </>
          )}
        </button>
      </Header>
      {loading ? (
        <Loader>Please wait ... </Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK : </span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL : </span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE : </span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          <Description>
            {infoData?.description.length
              ? infoData?.description.length > 200
                ? `${infoData?.description.slice(0, 200)} ... `
                : infoData?.description
              : null}
          </Description>

          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY : </span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY : </span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch?.isExact != null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch?.isExact != null}>
              <Link to={`/${coinId}/price`}> Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} USD={tickersData?.quotes.USD!} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

// const [loading, setLoading] = useState(true);
// const [info, setInfo] = useState<IInfoData>();
// const [priceInfo, setPriceInfo] = useState<IPriceData>();
// useEffect(() => {
//   (async () => {
//     const infoData = await (
//       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
//     ).json();
//     const priceData = await (
//       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
//     ).json();
//     setInfo(infoData);
//     setPriceInfo(priceData);
//     setLoading(false);
//   })();
// }, [coinId]);
