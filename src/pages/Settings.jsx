import Column from '../ui/Column';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '../features/settings/components/UpdateSettingsForm';
import { css } from 'styled-components';

function Settings() {
  return (
    <Column
      columnStyles={css`
        gap: 2.5rem;
      `}
    >
      <Heading as='h1'>update hotel settings</Heading>
      <UpdateSettingsForm />
    </Column>
  );
}

export default Settings;
