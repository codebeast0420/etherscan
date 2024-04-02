import React from "react";
import moment from "moment";
import styles from "@/styles/Home.module.css";

type Result = {
  hash: string;
  method: string;
  block_number: string;
  block_timestamp: string;
  from_address: string;
  to_address: string;
  value: number;
  gas_price: number;
  decoded_call?: {
    label: string;
  };
};

type SearchResultsProps = {
  result: Result[];
  searchInput: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  result,
  searchInput,
}) => {
  return (
    <section className={styles.searchResults}>
      <p className={styles.amountOfTransactions}>
        Latest 15 from a total of{" "}
        <span className={styles.blueText}>{result.length}</span> transactions.
      </p>
      <table className={styles.txnSection}>
        <thead>
          <tr className={styles.txnTitle}>
            <th>Transaction Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th className={styles.blueText}>Age</th>
            <th>From</th>
            <th></th>
            <th>To</th>
            <th>Value</th>
            <th className={styles.blueText}>Txn Fee</th>
          </tr>
        </thead>
        {result.slice(0, 15).map((txn) => {
          return (
            <tbody key={txn.hash}>
              <tr className={styles.txn}>
                <td className={styles.blueText}>{txn.hash.slice(0, 14)}...</td>
                <td>
                  <span className={styles.transfer}>
                    {txn.decoded_call ? txn.decoded_call.label : "unknown"}
                  </span>
                </td>
                <td className={styles.blueNumber} style={{ width: "6rem" }}>
                  {txn.block_number}
                </td>
                <td>{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</td>
                <td>
                  {txn.from_address.slice(0, 8)}...{txn.from_address.slice(34)}
                </td>
                <td>
                  <span
                    className={`${
                      txn.from_address.toLowerCase() !==
                      searchInput.toLowerCase()
                        ? styles.inTxn
                        : styles.outTxn
                    }`}
                  >
                    {txn.from_address.toLowerCase() !==
                    searchInput.toLowerCase()
                      ? "IN"
                      : "OUT"}
                  </span>
                </td>
                <td className={styles.blueText}>
                  {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
                </td>
                <td>{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
                <td>{(txn.gas_price / 10 ** 18).toFixed(12)}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </section>
  );
};
export default SearchResults;
