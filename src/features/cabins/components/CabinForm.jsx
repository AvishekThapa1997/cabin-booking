import Input from '../../../ui/Input';
import Form from '../../../ui/Form';
import Button from '../../../ui/Button';
import FileInput from '../../../ui/FileInput';
import Textarea from '../../../ui/Textarea';
import { useForm } from 'react-hook-form';
import useCreateCabin from '../hooks/useCreateCabin';
import useToast from '../../../hooks/useToast';
import useReactQueryClient from '../../../hooks/useReactQueryClient';
import FormRow from '../../../ui/FormRow';

function CabinForm() {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const queryClient = useReactQueryClient();
  const toast = useToast();
  const addCabinSuccessHandler = () => {
    //toast.success('Cabin is created successfully.');
    reset();
    queryClient.invalidateQueries({
      queryKey: ['cabins'],
    });
  };

  const { mutateAsync: createCabin, isLoading: isCreating } = useCreateCabin({
    onSuccess: addCabinSuccessHandler,
  });
  function submitHandler(formData) {
    const {
      image: [cabinImage],
      ...remainingFormData
    } = formData;
    const cabinData = {
      image: cabinImage,
      ...remainingFormData,
    };
    createCabin(cabinData);
    toast.promise(createCabin(cabinData), {
      loading: 'Please wait...',
      success: 'Cabin is created successfully.',
      error: (error) => error.message,
    });
  }
  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow
        label='Name'
        errorMessage={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'Please enter name.',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Capacity should be atleast 1.',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1.',
            },
          })}
          defaultValue={1}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'Price cannot be less than 1.',
            min: {
              value: 1,
              message: 'Price cannot be less than 1.',
            },
          })}
          defaultValue={1}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label='Discount'
        errorMessage={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          {...register('discount', {
            validate: (discountValue) => {
              return (
                +discountValue < +getValues('regularPrice') ||
                'Discount cannot be greater that regular price.'
              );
            },
          })}
          defaultValue={0}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          {...register('description', {
            required: 'Description should contain atleast 16 characters.',
            validate: (value) => {
              return (
                value?.trim().length >= 16 ||
                'Description should contain atleast 16 characters.'
              );
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        errorMessage={errors?.image?.message}
      >
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'Please upload image for cabin.',
          })}
          disabled={isCreating}
          placeholder='Image'
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
