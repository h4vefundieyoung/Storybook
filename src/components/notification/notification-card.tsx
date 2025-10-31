'use client';

import clsx from 'clsx';

import {
  type NotificationOptions,
  type NotificationType,
} from './notification-provider';
import { useEffect, useCallback } from '@/hooks/hooks';
import { type IconName, Icon } from '@/components/icon/icon';

import styles from './styles.module.css';

interface Properties extends Omit<NotificationOptions, 'onClose'> {
  onClose: (uuid: string) => void;
}

const FADE_TIME = 1000;

const iconsMap: { [K in NotificationType]: IconName } = {
  success: 'info',
  error: 'error',
};

const stylesMap: {
  [k in NotificationType]: string;
} = {
  success: styles['notification-success'],
  error: styles['notification-error'],
};

const NotificationCard = ({
  message,
  onClose,
  isExpired,
  isClosable,
  uuid,
  type,
}: Properties) => {
  const handleClose = useCallback(() => {
    onClose(uuid);
  }, [onClose, uuid]);

  useEffect(() => {
    if (isExpired) {
      setTimeout(() => {
        onClose(uuid);
      }, FADE_TIME);
    }
  }, [onClose, isExpired, uuid]);

  return (
    <li
      className={clsx(
        styles['notification-card'],
        stylesMap[type],
        isExpired && styles['fade'],
      )}
    >
      <div className={styles['card-message-container']}>
        <Icon name={iconsMap[type]} height={20} width={20} />
        {message}
      </div>
      {isClosable && (
        <button className={styles['close-button']} onClick={handleClose}>
          X
        </button>
      )}
    </li>
  );
};

export { NotificationCard };
