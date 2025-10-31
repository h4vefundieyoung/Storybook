'use client';

import clsx from 'clsx';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Icon, type IconName } from '@/components/icon/icon';
import { useCallback, useState, useController } from '@/hooks/hooks';

import styles from './styles.module.css';

interface Properties<T extends FieldValues> {
  cleareable: boolean;
  errors: FieldErrors<T>;
  label: string;
  labelHidden?: boolean;
  placeholder?: string;
  type: 'password' | 'text' | 'number';
  autocomplete?: HTMLInputElement['autocomplete'];
  inputControl: Control<T, null>;
  name: FieldPath<T>;
  onClear?: () => void;
}

const Input = <T extends FieldValues>({
  autocomplete = 'off',
  type,
  label,
  cleareable,
  errors,
  inputControl: control,
  name,
  placeholder,
  onClear,
  labelHidden,
}: Properties<T>) => {
  const isPasswordInput = type === 'password';

  const { field } = useController({ control, name });
  const [isHidden, setHidden] = useState<boolean>(isPasswordInput);

  const error = errors[name]?.message as string;
  const iconName: Extract<IconName, 'eye' | 'eyeOff'> = isHidden
    ? 'eyeOff'
    : 'eye';

  const handleVisibilityToggle = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      setHidden((prevState) => !prevState);
    },
    [setHidden],
  );

  const handleClear = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (onClear) {
        onClear();
      }
    },
    [onClear],
  );

  const actualPasswordType: Extract<
    Properties<T>['type'],
    'password' | 'text'
  > = isHidden ? 'text' : 'password';
  const actualType = isPasswordInput ? actualPasswordType : type;

  const isClearebleButtonVisible =
    type !== 'number' && cleareable && onClear && field.value;
  const isPasswordTogglerVisible = isPasswordInput && field.value;
  const hasError = Boolean(error);

  return (
    <label className={styles['label']}>
      {!labelHidden && <span>{label}</span>}
      <div className={styles['input-container']}>
        <input
          onChange={field.onChange}
          name={field.name}
          value={field.value}
          placeholder={placeholder}
          type={actualType}
          className={clsx(
            styles['input'],
            isPasswordTogglerVisible && styles['icon-spacing'],
          )}
          autoComplete={autocomplete}
        />
        {isPasswordTogglerVisible && (
          <span className={styles['icon-container']}>
            <Icon
              onClick={handleVisibilityToggle}
              name={iconName}
              width={24}
              height={24}
            />
          </span>
        )}
        {isClearebleButtonVisible && (
          <button onClick={handleClear} className={styles['clear-button']}>
            X
          </button>
        )}
      </div>
      {hasError && <span>{error}</span>}
    </label>
  );
};

export { Input, type Properties as InputProperties };
