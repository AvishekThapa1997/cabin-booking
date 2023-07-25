import Input from '../../../ui/Input';
import Form from '../../../ui/Form';
import Button from '../../../ui/Button';
import FileInput from '../../../ui/FileInput';
import Textarea from '../../../ui/Textarea';
import { useForm } from 'react-hook-form';
import useCreateCabin from '../hooks/useCreateCabin';
import useToast from '../../../hooks/useToast';
import FormRow from '../../../ui/FormRow';
import useEditCabin from '../hooks/useEditCabin';

function CabinForm({
  id,
  name,
  regularPrice,
  discount,
  description,
  maxCapacity,
  image,
}) {
  const isFormInEditMode = Boolean(id);
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isFormInEditMode
      ? {
          name,
          regularPrice,
          discount,
          maxCapacity,
          description,
          image,
        }
      : {},
  });
  const toast = useToast();
  const mutateCabinSuccessHandler = (data) => {
    if (isEditing) {
      reset({
        ...data,
      });
    } else {
      reset();
    }
  };

  const { mutateAsync: createCabin, isLoading: isCreating } = useCreateCabin({
    onSuccessHandler: mutateCabinSuccessHandler,
  });
  const { mutateAsync: editCabin, isLoading: isEditing } = useEditCabin({
    onSuccessHandler: mutateCabinSuccessHandler,
  });
  const disabledElement = isCreating || isEditing;
  function submitHandler(formData) {
    const { image: cabinImage, ...remainingFormData } = formData;
    const updatedImage =
      cabinImage instanceof FileList ? cabinImage[0] : cabinImage;
    const isPreviousImageAvailable = image !== null && image !== cabinImage;
    const cabinData = {
      image: updatedImage,
      ...remainingFormData,
      ...(isFormInEditMode && isPreviousImageAvailable
        ? { previousImage: image }
        : {}),
    };
    toast.promise(
      isFormInEditMode
        ? editCabin({ cabinId: id, cabinDataToUpdate: cabinData })
        : createCabin(cabinData),
      {
        loading: 'Please wait...',
        success: isCreating
          ? 'Cabin is created successfully.'
          : 'Cabin updated successfully.',
        error: (error) => error.message,
      },
    );
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
          disabled={disabledElement}
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
          disabled={disabledElement}
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
          disabled={disabledElement}
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
          disabled={disabledElement}
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
          disabled={disabledElement}
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
            required: isFormInEditMode
              ? false
              : 'Please upload image for cabin.',
          })}
          disabled={disabledElement}
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
        <Button disabled={disabledElement}>
          {isFormInEditMode ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
