import { css } from 'styled-components';
import CabinTable from '../features/cabins/components/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { useState } from 'react';
import Button from '../ui/Button';
import Column from '../ui/Column';
import CabinForm from '../features/cabins/components/CabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row
        rowStyles={css`
          justify-content: space-between;
        `}
      >
        <Heading as='h1'>all cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Column>
        <CabinTable />
        <Button onClick={() => setShowForm(!showForm)}>add new cabin</Button>
        {showForm ? <CabinForm /> : null}
      </Column>
    </>
  );
}

export default Cabins;
