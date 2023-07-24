import CabinTable from '../features/cabins/components/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row>
        <Heading as='h1'>all cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
