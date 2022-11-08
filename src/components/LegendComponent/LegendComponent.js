import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LegendComponent = ({ payload, onClickHandler }) => {
  console.log('payload', payload);

  return (
    <LegendContainer>
      {payload.map((entry) => {
        const { inactive, dataKey, color, value } = entry;
        return (
          <FormGroup key={dataKey}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!inactive}
                  onChange={() => onClickHandler(entry)}
                />
              }
              label={value}
              sx={{
                color,
                '&& .Mui-checked': {
                  color,
                },
              }}
            />
          </FormGroup>
        );
      })}
    </LegendContainer>
  );
};

LegendComponent.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      inactive: PropTypes.bool,
      dataKey: PropTypes.string,
      color: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onClickHandler: PropTypes.func,
};

LegendComponent.defaultProps = {
  onClickHandler: () => null,
};

function areEqual(prevProps, nextProps) {
  const { payload: prevPayload, onClickHandler: clickPrevious } = prevProps;
  const { payload: nextPayload, onClickHandler: clickNext } = nextProps;

  return (
    JSON.stringify(prevPayload) === JSON.stringify(nextPayload) &&
    clickPrevious == clickNext
  );
}

export default React.memo(LegendComponent, areEqual);
