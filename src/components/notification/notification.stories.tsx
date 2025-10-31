import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PropsWithChildren } from 'react';

import { useNotificationContext } from '@/hooks/hooks';
import {
  NotificationProvider,
  type NotificationBaseOptions,
} from './notification-provider';

const meta = {
  title: 'Components/Notification',
  component: NotificationProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (options) => {
    const NotificationButton = () => {
      const { addNotification } = useNotificationContext();
      const handleNotification = () => addNotification(options);

      return <button onClick={handleNotification}>Notify</button>;
    };

    return (
      <NotificationProvider>
        <NotificationButton />
      </NotificationProvider>
    );
  },
} satisfies Meta<NotificationBaseOptions & PropsWithChildren>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorNotification: Story = {
  args: {
    message: 'Error',
    type: 'error',
    duration: 5000,
  },
};

export const SuccessNotification: Story = {
  args: {
    message: 'Success',
    type: 'success',
    duration: 3000,
  },
};

export const ClosableNotification: Story = {
  args: {
    message: 'Success',
    type: 'success',
    isClosable: true,
    duration: 10000,
  },
};
