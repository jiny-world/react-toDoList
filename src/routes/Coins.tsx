import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 20px;

  a {
    padding: 20px;
    align-items: center;
    display: flex;
    transition: color 0.3s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

const CoinImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin List</title>
      </Helmet>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        <Loader>Please wait</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((data) => (
            <Coin key={data.id}>
              <Link
                to={{
                  pathname: `/${data.id}`,
                  state: { name: data.name },
                }}
              >
                <CoinImg
                  src={`https://coinicons-api.vercel.app/api/icon/${data.symbol.toLowerCase()}`}
                />
                {data.name} &rarr;{" "}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

// const [coins, setCoins] = useState<CoinInterface[]>([]);
// const [loading, setLoading] = useState(true);
// useEffect(() => {
//   (async () => {
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     setCoins(json.slice(0, 100));
//     setLoading(false);
//   })();
// }, []);
