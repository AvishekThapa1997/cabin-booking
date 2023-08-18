import { useForm } from 'react-hook-form';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Spinner from '../../../ui/Spinner';
import useGetSettings from '../hooks/useGetSettings';
import useUpdateSettings from '../hooks/useUpdateSettings';
import { useState } from 'react';

const settingFormFields = [
  {
    id: 'min-nights',
    name: 'minBooking',
    label: 'Minimum nights/booking',
    type: 'number',
  },
  {
    id: 'max-nights',
    name: 'maxBooking',
    type: 'number',
    label: 'Maximum nights/booking',
  },
  {
    id: 'max-guests',
    name: 'maxGuestPerBooking',
    type: 'number',
    label: 'Maximum guests/booking',
  },
  {
    id: 'breakfast-price',
    name: 'breakfastPrice',
    type: 'number',
    label: 'Breakfast price',
  },
];

function UpdateSettingsForm() {
  const [currentUpdatingField, setCurrentUpdatingField] = useState(null);
  const { isLoading, data } = useGetSettings();
  const { register } = useForm();
  const { mutate: updateSettings, isLoading: isUpdatingSettings } =
    useUpdateSettings({ onSettledHandler: updateSettingSettledHandler });
  if (isLoading && !data) {
    return <Spinner />;
  }
  function updateHandler(prevValue) {
    return (event) => {
      const { name: fieldName, value: newValue } = event.target;
      if (newValue === prevValue) {
        return;
      }
      const settingsToUpdate = { [fieldName]: newValue };
      updateSettings(settingsToUpdate);
      setCurrentUpdatingField(fieldName);
    };
  }

  function updateSettingSettledHandler() {
    setCurrentUpdatingField(null);
  }

  return (
    <Form>
      {settingFormFields.map(({ label, ...fieldAttributes }) => {
        const fieldName = fieldAttributes.name;
        const value = data[fieldName];
        const disabled =
          isUpdatingSettings && currentUpdatingField === fieldName;
        return (
          <FormRow
            label={label}
            key={fieldAttributes.id}
          >
            <Input
              {...fieldAttributes}
              {...register(fieldAttributes.name, {
                value,
              })}
              onBlur={updateHandler(value)}
              disabled={disabled}
            />
          </FormRow>
        );
      })}
      {/* <Button disabled={isLoading}>update</Button> */}
    </Form>
  );
}

export default UpdateSettingsForm;
