import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";

import styles from "@/styles/Home.module.css";
import Logo from "../../public/assets/logo.png";

const Header: React.FC = () => {
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    const getEthPrice = async () => {
      try {
      const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
      setEthPrice(response.data.result.ethusd);
      } catch (error) {
      console.error("Error fetching ETH price:", error);
      }
    };
    getEthPrice();
  }, []);

  return (
    <section className="w-full px-10 pt-5">
      <section className="">
        ETH Price:{" "}
        <span className="">${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className="flex justify-between pt-5">
        <Image
          src={Logo}
          alt="Etherscan Logo"
          className="w-[150px] h-[34px]"
          onClick={() => Router.reload()}
          style={{
            cursor: "pointer",
          }}
        />
        <section className="flex gap-3 text-lg">
          <p>Home</p>
          <p>
            Blockchain
          </p>
          <p>
            Token
          </p>
          <p>
            NFTs
          </p>
          <p>
            Resources
          </p>
          <p>
            Developers
          </p>
          <p>
            More
          </p>
          <p>|</p>
          <p className="">
            Sign In
          </p>
        </section>
      </section>
    </section>
  );
};
export default Header;
