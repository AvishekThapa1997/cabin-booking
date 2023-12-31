import styled from 'styled-components';
import { useCabins } from '../hooks/useCabins';
import Spinner from '../../../ui/Spinner';
import CabinRow from './CabinRow';
import Message from '../../../ui/Message';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  margin-top: 3.2rem;
  flex: 1;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { data: cabins = [], error, isFetching } = useCabins();
  if (isFetching && cabins.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      {error ? (
        <Message
          type='error'
          centerText
        >
          {error.message}
        </Message>
      ) : null}
      {cabins && cabins.length === 0 ? (
        <Message centerText>no cabins to show!</Message>
      ) : null}
      {cabins && cabins.length > 0 ? (
        <Table role='table'>
          <TableHeader>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </TableHeader>
          {cabins.map((cabin) => (
            <CabinRow
              {...cabin}
              key={cabin.id}
            />
          ))}
        </Table>
      ) : null}
    </>
  );
}

export default CabinTable;
