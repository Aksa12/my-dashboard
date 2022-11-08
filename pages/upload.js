import { useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Box from '@mui/material/Box';

import DragDropFile from '../src/components/DragDropFile/DragDropFile';
import UploadedFile from '../src/components/UploadedFile/UploadedFile';

import { TransactionContext } from '../src/context/TransactionProvider';

const ContentContainer = styled(Box)`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 80%;
    margin: auto;
  }
`;

export default function Upload() {
  const {
    transactions,
    setTransactions,
    setTotalDebitAmount,
    setTotalCreditAmount,
    setTotalDebitTransactions,
    setTotalCreditTransactions,
    setDateRange,
    setTransactionByDescription,
    setFilteredTransactions,
    setFilename,
  } = useContext(TransactionContext);

  const changeHandler = async (event) => {
    const data = event.target.files[0];
    const textCSV = await data.text();
    const lines = textCSV.split('\n').slice(4);

    let dates = lines.map(
      (line) => line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[0]
    );

    let debit = lines.map(
      (line) => line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[3]
    );

    let credit = lines.map(
      (line) => line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[4]
    );

    let totalDebitAmount = 0;
    let totalDebitTransactions = 0;

    dates = dates.map((dt) => dt.replace(/\//g, '-'));

    const initialDateStr = dates[dates.length - 1];
    const finalDateStr = dates[0];

    const [dtI, monthI, yearI] = initialDateStr.split('-');
    const [dtF, monthF, yearF] = finalDateStr.split('-');
    let range = parseInt(monthI) !== parseInt(monthF);
    const initialDate = new Date(
      `${yearI.length === 2 ? 20 : ''}${yearI}`,
      parseInt(monthI) - 1,
      dtI
    );
    const finalDate = new Date(
      `${yearF.length === 2 ? 20 : ''}${yearF}`,
      parseInt(monthF) - 1,
      dtF
    );

    const dateRange = {
      range,
      initialDate,
      finalDate: finalDate,
    };

    debit = debit.map((data) => {
      const value = data.replace('"', '').replace(',', '');
      const amount = value ? parseFloat(value) : null;
      totalDebitAmount += amount || 0;
      totalDebitTransactions += amount ? 1 : 0;
      return amount;
    });

    let totalCreditAmount = 0;
    let totalCreditTransactions = 0;

    credit = credit.map((data) => {
      const value = data.replace('"', '').replace(',', '');
      const amount = value ? parseFloat(value) : null;
      totalCreditAmount += amount || 0;
      totalCreditTransactions += amount ? 1 : 0;
      return amount;
    });

    const descriptionArr = [];

    const descriptions = lines.reduce((result, line, index) => {
      let description = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];
      description = description.split('   ')?.[0];
      const prevDebitAcc = result[description]?.debit || 0;
      const prevCreditAcc = result[description]?.credit || 0;

      descriptionArr.push(description);
      return {
        ...result,
        [description]: {
          credit: prevCreditAcc + (credit[index] || 0),
          debit: prevDebitAcc + (debit[index] || 0),
        },
      };
    }, {});
    console.log('descriptions', descriptions);

    const csvData = dates.map((date, index) => ({
      name: date,
      debit: debit[index],
      credit: credit[index],
      description: descriptionArr[index],
    }));
    csvData.reverse();
    console.log('csvData', csvData);
    setFilename(data.name);
    setDateRange(dateRange);
    setTransactionByDescription(descriptions);
    setTransactions(csvData);
    setFilteredTransactions(csvData);
    setTotalDebitAmount(totalDebitAmount);
    setTotalCreditAmount(totalCreditAmount);
    setTotalDebitTransactions(totalDebitTransactions);
    setTotalCreditTransactions(totalCreditTransactions);
  };

  console.log('transactions', transactions);

  return (
    <div>
      <Head>
        <title>Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer>
        <DragDropFile changeHandler={changeHandler} />
        <UploadedFile />
      </ContentContainer>
    </div>
  );
}
