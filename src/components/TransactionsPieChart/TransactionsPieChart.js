import PropTypes from 'prop-types';
import { useState, useContext } from 'react';

import { useTheme } from '@mui/material';

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Sector,
  Label,
  LabelList,
} from 'recharts';

import { TransactionContext } from '../../context/TransactionProvider';
import { formatNumberWithCommas } from '../../utils/helperFunctions';
import { theme } from '../../../pages/_app';

const COLORS = [theme.palette.error.main, theme.palette.success.main];

const CustomLabel = (props) => {
  const theme = useTheme();
  const { viewBox, labelText, value } = props;
  const { cx, cy } = viewBox;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="14"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill={theme.palette.primary.main}
        fontSize="16"
        fontWeight="600"
      >
        Rs. {formatNumberWithCommas(value.toFixed(2))}
      </text>
    </g>
  );
};

CustomLabel.propTypes = {
  viewBox: PropTypes.shape({
    cx: PropTypes.number,
    cy: PropTypes.number,
  }),
  labelText: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

CustomLabel.defaultProps = {
  viewBox: {},
};

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <CustomLabel
        labelText={payload.name}
        value={value}
        viewBox={{
          cx,
          cy,
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  fill: PropTypes.string,
  payload: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  value: PropTypes.number.isRequired,
};

renderActiveShape.defaultProps = {
  fill: null,
};

const TransactionsPieChart = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const { totalDebitAmount, totalCreditAmount } =
    useContext(TransactionContext);

  const totalAmount = totalDebitAmount + totalCreditAmount;

  const data = [
    {
      name: 'debit',
      value: totalDebitAmount,
    },
    {
      name: 'credit',
      value: totalCreditAmount,
    },
  ];

  const onMouseEnterHandler = (_, index) => {
    setActiveIndex(index);
  };

  const onMouseLeaveHandler = () => {
    setActiveIndex(null);
  };

  if (totalDebitAmount === null || totalCreditAmount === null) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={730} height={450}>
        <Pie
          data={data}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={110}
          dataKey="value"
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {activeIndex === null && (
            <Label
              position="center"
              content={
                <CustomLabel
                  labelText="Total"
                  value={totalDebitAmount + totalCreditAmount}
                />
              }
            />
          )}
          <LabelList
            dataKey="value"
            position="insideRight"
            fontSize="10px"
            fill={theme.palette.primary.contrastText}
            stroke="none"
            formatter={(value) =>
              `${((value / totalAmount) * 100).toFixed(1)}%`
            }
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionsPieChart;
