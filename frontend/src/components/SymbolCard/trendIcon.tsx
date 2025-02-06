import React, { memo } from 'react';
import TrendUpIcon from '@/assets/up.png';
import TrendDownIcon from '@/assets/down.png';

interface ITrendProps {
  trend: 'UP' | 'DOWN' | null;
}

const TrendIcon = ({ trend }: ITrendProps) => {
  const iconSrc = trend === 'UP' ? TrendUpIcon : trend === 'DOWN' ? TrendDownIcon : undefined;

  return <img className="symbolCard__trend-icon" src={iconSrc} alt="" />;
};

export default memo(TrendIcon);
