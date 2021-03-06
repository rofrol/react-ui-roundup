import { Chip as MuiChip, Typography, withStyles } from '@material-ui/core';
import { map } from 'ramda';
import React, { FC } from 'react';

const Wrapper: FC = ({ children }) => <div style={{ margin: 16 }}>{children}</div>;
const Row: FC = ({ children }) => <div style={{ marginBottom: 8 }}>{children}</div>;

const Title = withStyles({
  root: {
    marginBottom: 8,
  },
})(Typography);

const Chip = withStyles({
  root: {
    marginRight: 4,
  },
})(MuiChip);

interface Props {
  items: [string, string][];
}

export const Criteria: FC<Props> = ({ items }) => (
  <Wrapper>
    <Title variant="h6">Criteria</Title>
    {map(([name, description]) => (
      <Row key={name} >
        <Chip label={name} size="small" />
        <Typography variant="caption">{description}</Typography>
      </Row>
    ), items)}
  </Wrapper>
);
