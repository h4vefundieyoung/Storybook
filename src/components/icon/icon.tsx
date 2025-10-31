import { IconMap, type IconName } from './icon-map';

import styles from './styles.module.css';

interface IconProps {
  name: IconName;
  height: number;
  width: number;
  onClick?: (event: React.SyntheticEvent) => void;
}

const Icon = ({ name, width, height, onClick }: IconProps) => {
  const Icon = IconMap[name];

  return (
    <Icon
      className={styles['icon']}
      onClick={onClick}
      width={width}
      height={height}
    />
  );
};

export { Icon, type IconName };
