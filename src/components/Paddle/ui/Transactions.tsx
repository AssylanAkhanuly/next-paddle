import { TransactionCollection } from "@paddle/paddle-node-sdk";

const Transactions = ({
  transactions,
}: {
  transactions: TransactionCollection;
}) => {
  console.log(transactions);
  return <div></div>;
};

export default Transactions;
