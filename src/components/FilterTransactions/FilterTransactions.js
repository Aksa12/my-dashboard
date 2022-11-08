import { useState, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TransactionContext } from '../../context/TransactionProvider';

const Container = styled.div`
  display: flex;
  margin: 16px 0 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    align-items: center;
  }
`;

const HeadingTypography = styled(Typography)`
  && {
    margin-right: 16px;
  }
`;

const PickerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: row;
  }

  label {
    top: -5px;
  }
`;

const TextFieldStyled = styled(TextField)`
  &:first-child {
    margin-bottom: 16px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      margin-right: 16px;
      margin-bottom: 0;
    }
  }

  input {
    padding: 12px 14px;
    padding-right: 0;
    font-size: 14px;
  }
`;

const FilterTransactions = () => {
  const {
    dateRange,
    transactions,
    setFilteredTransactions,
    setTotalDebitAmount,
    setTotalCreditAmount,
    setTotalDebitTransactions,
    setTotalCreditTransactions,
    setTransactionByDescription,
  } = useContext(TransactionContext);

  const [value, setValue] = useState(moment(dateRange?.initialDate));
  const [endValue, setEndValue] = useState(moment(dateRange?.finalDate));
  const [validStartDate, setValidStartDate] = useState(value);
  const [validEndDate, setValidEndDate] = useState(endValue);

  const isValid = (date, startDate, endDate) => {
    console.log('date', date, startDate, endDate);
    if (
      date.isSameOrAfter(startDate, 'day') &&
      date.isSameOrBefore(endDate, 'day')
    ) {
      return true;
    }
    return false;
  };

  const filterTransactions = (startDate, endDate) => {
    const result = transactions.filter(({ name }) => {
      const currDate = moment(name, 'DD-MM-YYYY');
      if (
        currDate.isSameOrAfter(startDate, 'day') &&
        currDate.isSameOrBefore(endDate, 'day')
      ) {
        return true;
      }
      return false;
    });

    const {
      debitAmount,
      creditAmount,
      debitTransactions,
      creditTransactions,
      transDescription,
    } = result.reduce(
      (AccObj, { debit, credit, description }) => {
        return {
          debitAmount: AccObj.debitAmount + (debit || 0),
          creditAmount: AccObj.creditAmount + (credit || 0),
          debitTransactions: AccObj.debitTransactions + (debit ? 1 : 0),
          creditTransactions: AccObj.creditTransactions + (credit ? 1 : 0),
          transDescription: {
            ...AccObj.transDescription,
            [description]: {
              credit:
                (AccObj.transDescription[description]?.credit || 0) +
                (credit || 0),
              debit:
                (AccObj.transDescription[description]?.debit || 0) +
                (debit || 0),
            },
          },
        };
      },
      {
        debitAmount: 0,
        creditAmount: 0,
        debitTransactions: 0,
        creditTransactions: 0,
        transDescription: {},
      }
    );

    console.log('result', result);
    setTotalDebitAmount(debitAmount);
    setTotalCreditAmount(creditAmount);
    setTotalDebitTransactions(debitTransactions);
    setTotalCreditTransactions(creditTransactions);
    setTransactionByDescription(transDescription);
    setFilteredTransactions(result);
  };

  if (!transactions) return null;

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container>
          <HeadingTypography variant="subtitle2">
            Change range:
          </HeadingTypography>
          <PickerContainer>
            <DatePicker
              disableFuture
              label="Start date"
              views={['year', 'month', 'day']}
              value={value}
              minDate={moment(dateRange?.initialDate)}
              maxDate={validEndDate.clone().subtract(1, 'days')} // final - 1
              onChange={(newValue) => {
                setValue(newValue);
                if (newValue?.isValid()) {
                  setValidStartDate(newValue);
                }
                if (newValue && isValid(newValue, validStartDate, validEndDate))
                  filterTransactions(newValue, endValue);
              }}
              renderInput={(params) => <TextFieldStyled {...params} />}
            />
            <DatePicker
              disableFuture
              label="End date"
              views={['year', 'month', 'day']}
              value={endValue}
              minDate={validStartDate.clone().add(1, 'days')} // initial + 1
              maxDate={moment(dateRange?.finalDate)}
              onChange={(newValue) => {
                setEndValue(newValue);
                if (newValue?.isValid()) {
                  setValidEndDate(newValue);
                }
                if (newValue && isValid(newValue, validStartDate, validEndDate))
                  filterTransactions(newValue, endValue);
              }}
              renderInput={(params) => <TextFieldStyled {...params} />}
            />
          </PickerContainer>
        </Container>
      </LocalizationProvider>
    </div>
  );
};

export default FilterTransactions;
