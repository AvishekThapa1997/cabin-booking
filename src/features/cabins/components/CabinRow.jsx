import styled from 'styled-components';
import { formatCurrency } from '../../../utils/helpers';
import useDeleteCabin from '../hooks/useDeleteCabin';
import useToast from '../../../hooks/useToast';
import { useState } from 'react';
import CabinForm from './CabinForm';
import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';
import useCreateCabin from '../hooks/useCreateCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({
  id,
  name,
  regularPrice,
  discount,
  description,
  maxCapacity,
  image,
}) {
  const [cabinIdToEdit, setCabinIdToEdit] = useState(null);
  const toast = useToast();
  const { mutateAsync: deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  const { mutateAsync: createCabin, isLoading: isCreating } = useCreateCabin();
  const disabledButton = isDeleting || isCreating;
  const copyCabinHandler = () => {
    const cabinDataToCopy = {
      name,
      regularPrice,
      discount,
      description,
      maxCapacity,
      image,
    };
    toast.promise(createCabin(cabinDataToCopy), {
      loading: 'Please wait...',
      success: 'Cabin is duplicated successfully.',
      error: (error) => error.message,
    });
  };
  return (
    <>
      <TableRow role='row'>
        <Img
          src={image}
          alt={name}
        />
        <Cabin>{name}</Cabin>
        <div>Fit upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button
            onClick={copyCabinHandler}
            disabled={disabledButton}
          >
            <HiSquare2Stack />
          </button>
          <button
            disabled={disabledButton}
            onClick={() => {
              setCabinIdToEdit(id);
            }}
          >
            <HiPencil />
          </button>
          <button></button>
          <button
            disabled={disabledButton}
            onClick={() => {
              toast.promise(deleteCabin(id), {
                loading: <span>Please wait...</span>,
                success: <b>Cabin deleted successfully</b>,
                error: <span>Unable to delete cabin.Please try later.</span>,
              });
            }}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {cabinIdToEdit ? (
        <CabinForm
          {...{
            id,
            name,
            regularPrice,
            discount,
            description,
            maxCapacity,
            image,
          }}
        />
      ) : null}
    </>
  );
}
