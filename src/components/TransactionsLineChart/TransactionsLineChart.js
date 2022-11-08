import { useState, useContext } from 'react';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import LegendComponent from '../LegendComponent/LegendComponent';

import { TransactionContext } from '../../context/TransactionProvider';
import { formatNumberWithCommas } from '../../utils/helperFunctions';

const TransactionsLineChart = () => {
  const theme = useTheme();
  const [hideLines, setHideLines] = useState({
    debit: false,
    credit: false,
  });

  const { filteredTransactions } = useContext(TransactionContext);

  const onClickHandler = (data) => {
    setHideLines((val) => ({ ...val, [data.value]: !val[[data.value]] }));
  };

  if (!filteredTransactions) return null;

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={500}>
      <LineChart
        width={730}
        height={450}
        data={filteredTransactions}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2" />
        <XAxis
          dataKey="name"
          interval="preserveStartEnd"
          padding={{ left: 0, right: 16 }}
          tickFormatter={(val) => val.split('-')[0]}
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
            <Typography variant="caption">{`Date: ${value}`}</Typography>
          )}
          contentStyle={{
            border: `1px solid ${theme.palette.primary.main}`,
            height: 'unset',
            padding: '0 8px',
            margin: '0',
          }}
        />
        <Legend content={<LegendComponent onClickHandler={onClickHandler} />} />
        <Line
          type="monotone"
          connectNulls
          dataKey="debit"
          stroke={theme.palette.error.main}
          hide={hideLines.debit}
          activeDot={{ r: 8 }}
          strokeWidth={2}
          id="debit"
        />
        <Line
          type="monotone"
          connectNulls
          dataKey="credit"
          stroke={theme.palette.success.main}
          hide={hideLines.credit}
          activeDot={{ r: 8 }}
          strokeWidth={2}
          id="credit"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionsLineChart;
