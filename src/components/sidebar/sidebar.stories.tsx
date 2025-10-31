import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { useEffect, useRef } from '@/hooks/hooks';
import { Sidebar, type SidebarProperties } from './sidebar';

const Render = (options: SidebarProperties) => {
  const [{ isShown }, updateArgs] = useArgs<{ isShown: boolean }>();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        updateArgs({ isShown: false });
      }
    };

    document.addEventListener('mousedown', handleClose);

    return () => document.removeEventListener('mousedown', handleClose);
  }, [updateArgs]);

  return (
    <>
      <Sidebar ref={ref} {...options} isShown={isShown} />
    </>
  );
};

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  args: {
    isShown: true,
  },
  tags: ['autodocs'],
  render: Render,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionSidebar: Story = {
  args: {
    menu: [
      {
        heading: 'Heading1',
        content: {
          href: '/',
          description: 'Description1',
        },
      },
      {
        heading: 'Heading2',
        content: {
          href: '/',
          description: 'Description2',
        },
      },
    ],
  },
};

export const NestedAccordionSidebar: Story = {
  args: {
    menu: [
      {
        heading: 'Heading1',
        content: [
          {
            heading: 'Heading5',
            content: {
              href: '/',
              description: 'Description5',
            },
          },
          {
            heading: 'Heading6',
            content: {
              href: '/',
              description: 'Description6',
            },
          },
        ],
      },
      {
        heading: 'Heading2',
        content: [
          {
            heading: 'Heading3',
            content: {
              href: '/',
              description: 'Description3',
            },
          },
          {
            heading: 'Heading4',
            content: {
              href: '/',
              description: 'Description4',
            },
          },
        ],
      },
    ],
  },
};
