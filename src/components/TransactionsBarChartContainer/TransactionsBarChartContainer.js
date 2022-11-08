import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TransactionsBarChart from '../TransactionsBarChart/TransactionsBarChart';

const Container = styled(Grid)`
  margin-top: 24px;
`;

const ChartContainer = styled.div`
  height: 450px;
  margin-top: 24px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const TransactionsBarChartContainer = () => {
  return (
    <Container container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Distribution by Category</Typography>
            <ChartContainer>
              <TransactionsBarChart />
            </ChartContainer>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default TransactionsBarChartContainer;
