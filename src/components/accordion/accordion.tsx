'use client';

import Link from 'next/link';

import styles from './styles.module.css';

interface LinkData {
  href: string;
  description: string;
}

interface AccordionDataShape {
  heading: string;
  content: LinkData;
}

interface Properties {
  data: {
    heading: string;
    content: LinkData | AccordionDataShape[];
  }[];
}

const Accordion = ({ data }: Properties) => {
  const elements = data.map(({ heading, content }, index) => {
    const contentElement =
      content instanceof Array ? (
        <Accordion data={content} />
      ) : (
        <Link href={content.href}>{content.description}</Link>
      );
    const uuid = crypto.randomUUID();

    return (
      <li key={index}>
        <label htmlFor={uuid}>
          <h3 className={styles['accordion-heading']}>{heading}</h3>
        </label>
        <input className={styles['content-status']} type="checkbox" id={uuid} />
        <div className={styles['accordion-content']}>{contentElement}</div>
      </li>
    );
  });

  return <ul className={styles['accordion']}>{elements}</ul>;
};

export { Accordion, type Properties as AccordionProperties };
