'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import { useState, useCallback } from '@/hooks/hooks';
import { NotificationCard } from './notification-card';

import styles from './styles.module.css';

type NotificationType = 'success' | 'error';

interface NotificationOptions {
  type: NotificationType;
  duration: number;
  isClosable?: true;
  isExpired: boolean;
  message: string;
  onClose?: () => void;
  uuid: string;
}

type NotificationBaseOptions = Omit<NotificationOptions, 'isExpired' | 'uuid'>;

interface NotificationContext {
  addNotification: (options: NotificationBaseOptions) => void;
}

const NotificationContext = createContext<NotificationContext | null>(null);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notificationsOptions, setNotificationOptions] = useState<
    NotificationOptions[]
  >([]);

  const addNotification = (options: NotificationBaseOptions) => {
    setNotificationOptions((prevState) => {
      const uuid = crypto.randomUUID();
      const updatedOptions = [
        ...prevState,
        { ...options, uuid, isExpired: false },
      ];

      setTimeout(() => {
        setNotificationOptions((prevState) =>
          prevState.map((options) => {
            return options.uuid === uuid
              ? { ...options, isExpired: true }
              : options;
          }),
        );
      }, options.duration);

      return updatedOptions;
    });
  };

  const handleClose = useCallback((uuid: string) => {
    setNotificationOptions((prevState) =>
      prevState.filter(({ uuid: _uuid, onClose }) => {
        if (_uuid == uuid) {
          if (onClose) {
            onClose();
          }
          return false;
        }
        return true;
      }),
    );
  }, []);

  const notificationCards = notificationsOptions.map((options) => {
    return (
      <NotificationCard {...options} onClose={handleClose} key={options.uuid} />
    );
  });

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className={styles['notification-stack']}>{notificationCards}</div>
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

export {
  type NotificationOptions,
  type NotificationType,
  type NotificationBaseOptions,
  NotificationProvider,
  useNotificationContext,
};
