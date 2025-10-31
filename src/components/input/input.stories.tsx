import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FieldValues, type Control } from 'react-hook-form';
import { useForm } from '@/hooks/hooks';
import { Input, type InputProperties } from './input';

const Render = (args: InputProperties<unknown & FieldValues>) => {
  const { control, resetField, formState } = useForm({
    defaultValues: { [args.name]: '' },
  });

  return (
    <Input
      {...args}
      inputControl={control}
      errors={formState.errors}
      onClear={() => resetField(args.name)}
    />
  );
};

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    inputControl: { table: { disable: true } },
    errors: { table: { disable: true } },
    onClear: { table: { disable: true } },
    name: { table: { disable: true } },
  },
  args: {
    inputControl: {} as Control,
    errors: {},
    autocomplete: 'on',
  },
  tags: ['autodocs'],
  render: Render,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PasswordInput: Story = {
  args: {
    label: 'Password input',
    type: 'password',
    placeholder: 'Password',
    name: 'first',
    cleareable: false,
    labelHidden: false,
    autocomplete: 'on',
  },
};

export const PasswordClearableInput: Story = {
  args: {
    label: 'Password input',
    cleareable: true,
    labelHidden: true,
    type: 'password',
    placeholder: 'Password',
    name: 'second',
    autocomplete: 'off',
  },
};

export const TextInput: Story = {
  args: {
    label: 'Text',
    cleareable: false,
    labelHidden: false,
    type: 'text',
    placeholder: 'Text',
    name: 'third',
  },
};

export const TextClearableInput: Story = {
  args: {
    label: 'Text',
    labelHidden: true,
    cleareable: true,
    type: 'text',
    placeholder: 'Text',
    name: 'fourth',
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Number input',
    cleareable: false,
    labelHidden: false,
    type: 'number',
    name: 'fifth',
  },
};
