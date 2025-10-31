import clsx from 'clsx';
import { forwardRef } from 'react';

import { Accordion, type AccordionProperties } from '../accordion/accordion';

import styles from './styles.module.css';

interface Properties {
  isShown: boolean;
  menu: AccordionProperties['data'];
}

const Sidebar = forwardRef<HTMLElement, Properties>(
  ({ isShown, menu }: Properties, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(
          styles['sidebar'],
          !isShown && styles['sidebar-hidden'],
        )}
      >
        <Accordion data={menu} />
      </nav>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export { Sidebar, type Properties as SidebarProperties };
