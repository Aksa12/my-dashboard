import { useState, useContext } from 'react';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

import {
  BarChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from 'recharts';

import LegendComponent from '../LegendComponent/LegendComponent';

import { TransactionContext } from '../../context/TransactionProvider';
import {
  getAbbreviationsOfWordsList,
  formatNumberWithCommas,
} from '../../utils/helperFunctions';

const TransactionsBarChart = () => {
  const theme = useTheme();
  const [hideLines, setHideLines] = useState({
    debit: false,
    credit: false,
  });

  const { transactionByDescription } = useContext(TransactionContext);

  const abbrCategories = getAbbreviationsOfWordsList(
    Object.keys(transactionByDescription || {})
  );

  const filterDescriptions = Object.keys(transactionByDescription || {}).map(
    (key) => ({
      name: key,
      debit: transactionByDescription[key].debit,
      credit: transactionByDescription[key].credit,
    })
  );

  const onClickHandler = (data) => {
    setHideLines((val) => ({ ...val, [data.value]: !val[[data.value]] }));
  };

  if (!transactionByDescription) return null;

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={700}>
      <BarChart
        width={730}
        height={450}
        data={filterDescriptions}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barGap={0}
      >
        <CartesianGrid strokeDasharray="2" />
        <XAxis
          dataKey="name"
          interval={0}
          padding={{ left: 0, right: 16 }}
          minTickGap={20}
          fontSize="10px"
          tickFormatter={(val) => abbrCategories[val]}
        />
        <YAxis scale="sqrt" />
        <Tooltip
          formatter={(value, name, { color }) => [
            <Typography
              variant="caption"
              key={name}
              sx={{
                textTransform: 'capitalize',
                span: {
                  color,
                },
              }}
            >
              <span>{name}</span>: Rs. {formatNumberWithCommas(value)}
            </Typography>,
            null,
          ]}
          labelFormatter={(value) => (
            <Typography variant="caption">{`Cat: ${value}`}</Typography>
          )}
          contentStyle={{
            border: `1px solid ${theme.palette.primary.main}`,
            height: 'unset',
            padding: '0 8px',
            margin: '0',
          }}
        />
        <Legend content={<LegendComponent onClickHandler={onClickHandler} />} />
        <Bar
          barSize={10}
          dataKey="debit"
          fill={theme.palette.error.main}
          hide={hideLines.debit}
          id="debit"
        />
        <Bar
          dataKey="credit"
          fill={theme.palette.success.main}
          hide={hideLines.credit}
          id="credit"
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionsBarChart;
