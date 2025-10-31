import Eye from '@/assets/icons/eye.svg';
import EyeOff from '@/assets/icons/eye-off.svg';
import info from '@/assets/icons/info.svg';
import error from '@/assets/icons/error.svg';

type IconName = 'eye' | 'eyeOff' | 'error' | 'info';

const IconMap: Record<
  IconName,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  eye: Eye,
  eyeOff: EyeOff,
  info: info,
  error: error,
} as const;

export { IconMap, type IconName };
