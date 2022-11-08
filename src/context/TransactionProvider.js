import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TransactionContext = createContext(null);

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const [totalDebitAmount, setTotalDebitAmount] = useState(null);
  const [totalCreditAmount, setTotalCreditAmount] = useState(null);
  const [totalDebitTransactions, setTotalDebitTransactions] = useState(null);
  const [totalCreditTransactions, setTotalCreditTransactions] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [transactionByDescription, setTransactionByDescription] =
    useState(null);
  const [filename, setFilename] = useState(null);

  const contextValues = {
    transactions,
    setTransactions,
    filteredTransactions,
    setFilteredTransactions,
    totalDebitAmount,
    setTotalDebitAmount,
    totalCreditAmount,
    setTotalCreditAmount,
    totalDebitTransactions,
    setTotalDebitTransactions,
    totalCreditTransactions,
    setTotalCreditTransactions,
    dateRange,
    setDateRange,
    transactionByDescription,
    setTransactionByDescription,
    filename,
    setFilename,
  };

  return (
    <TransactionContext.Provider value={contextValues}>
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionProvider;
