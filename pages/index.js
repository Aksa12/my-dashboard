import Head from 'next/head';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import EarningCard from '../src/components/EarningCard/EarningCard';
import TransactionsLineChartContainer from '../src/components/TransactionsLineChartContainer/TransactionsLineChartContainer';
import TransactionsBarChartContainer from '../src/components/TransactionsBarChartContainer/TransactionsBarChartContainer';
import TransactionsPieChart from '../src/components/TransactionsPieChart/TransactionsPieChart';
import FilterTransactions from '../src/components/FilterTransactions/FilterTransactions';

import { TransactionContext } from '../src/context/TransactionProvider';
import { routeTo } from '../src/utils/route';

const EarningCardContainer = styled(Grid)`
  && {
    display: flex;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      justify-content: space-between;
    }

    & > div:first-child {
      margin-bottom: 16px;

      @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        margin-bottom: 0;
      }
    }
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const HeadingContent = styled.div`
  margin-right: 16px;
`;

const RangeInfoContainer = styled.div``;

export default function Home() {
  const {
    totalDebitAmount,
    totalCreditAmount,
    totalDebitTransactions,
    totalCreditTransactions,
    dateRange,
    filename,
  } = useContext(TransactionContext);

  console.log('date range', dateRange);
  const month = dateRange?.initialDate?.toLocaleString('default', {
    month: 'long',
  });
  const year = dateRange?.initialDate?.toLocaleString('default', {
    year: 'numeric',
  });

  const fmonth = dateRange?.finalDate?.toLocaleString('default', {
    month: 'long',
  });
  const fyear = dateRange?.finalDate?.toLocaleString('default', {
    year: 'numeric',
  });

  const rangeText =
    fyear === year
      ? `${month} - ${fmonth}, ${fyear}`
      : `${month}, ${year} - ${fmonth}, ${fyear}`;

  useEffect(() => {
    if (!filename) {
      routeTo('/upload');
    }
  }, [filename]);

  if (!filename) return null;

  return (
    <div>
      <Head>
        <title>Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingContainer>
        <HeadingContent>
          <Typography variant="h6">Financial Overview</Typography>
          <Typography variant="caption" component="p">
            Amount debited and credited
          </Typography>
        </HeadingContent>
        <RangeInfoContainer>
          <Typography variant="h6">
            {dateRange?.range ? rangeText : `${month}, ${year}`}
          </Typography>
        </RangeInfoContainer>
      </HeadingContainer>
      <FilterTransactions />
      <Grid container spacing={2}>
        <EarningCardContainer item xs={12} sm={6}>
          <EarningCard
            heading="Total Credit"
            amount={totalCreditAmount}
            transactionsCount={totalCreditTransactions}
          />
          <EarningCard
            heading="Total Debit"
            amount={totalDebitAmount}
            transactionsCount={totalDebitTransactions}
            isDebit
          />
        </EarningCardContainer>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Earning Distribution</Typography>
              <div
                style={{
                  height: '230px',
                  marginTop: '24px',
                }}
              >
                <TransactionsPieChart />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TransactionsLineChartContainer />
      <TransactionsBarChartContainer />
    </div>
  );
}
