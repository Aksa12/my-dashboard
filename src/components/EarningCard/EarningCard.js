import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Icon from '@mui/material/Icon';

import { formatNumberWithCommas } from '../../utils/helperFunctions';

const CardStyled = styled(Card)`
  && {
    background-color: ${({ theme, isDebit }) =>
      !isDebit ? theme.palette.success.light : theme.palette.error.light};
  }
`;

const Heading = styled(Typography)`
  font-weight: 500;
`;

const InfoContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: 'center';
`;

const ContentContainer = styled.div``;

const IconContainer = styled.div``;

const Amount = styled(Typography)``;

const TransactionsCount = styled(Typography)``;

const EarningCard = ({ heading, amount, transactionsCount, isDebit }) => {
  return (
    <CardStyled raised isDebit={isDebit}>
      <CardContent>
        <Heading variant="body">{heading}</Heading>
        <InfoContainer>
          <ContentContainer>
            <Amount variant="h6">
              Rs. {formatNumberWithCommas(amount?.toFixed(2))}
            </Amount>
            <TransactionsCount variant="caption" component="p">
              {transactionsCount} transactions
            </TransactionsCount>
          </ContentContainer>
          <IconContainer>
            <Icon
              color={isDebit ? 'error' : 'success'}
              fontSize="large"
              component={isDebit ? TrendingDownIcon : TrendingUpIcon}
            />
          </IconContainer>
        </InfoContainer>
      </CardContent>
    </CardStyled>
  );
};

export default EarningCard;

EarningCard.propTypes = {
  heading: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  transactionsCount: PropTypes.number.isRequired,
  isDebit: PropTypes.bool,
};

EarningCard.defaultProps = {
  isDebit: false,
};
