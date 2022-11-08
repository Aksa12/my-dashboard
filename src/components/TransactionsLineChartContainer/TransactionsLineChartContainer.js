import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TransactionsLineChart from '../TransactionsLineChart/TransactionsLineChart';

const Container = styled(Grid)`
  margin-top: 24px;
`;

const ChartContainer = styled.div`
  height: 450px;
  margin-top: 24px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const HeadingTypography = styled(Typography)``;

const TransactionsLineChartContainer = () => {
  return (
    <Container container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <HeadingTypography variant="h6">Overview</HeadingTypography>
            <ChartContainer>
              <TransactionsLineChart />
            </ChartContainer>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default TransactionsLineChartContainer;
