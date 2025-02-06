import { useCallback, useState, memo, useEffect } from 'react';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import { useGetPriceTrend } from '@/hooks/getPriceTrend';
import './symbolCard.css';

import TrendIcon from './trendIcon';
import CardPrice from './cardPrice';
import CardRow from './cardRow';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  size: string;
};

const SymbolCard = ({ id, onClick, price, size }: SymbolCardProps) => {
  const [selectedShadowClass, setSelectedShadowClass] = useState<string>();
  const { trend, industry, companyName, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const { isPositive, isNegative } = useGetPriceTrend(price);

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  useEffect(() => {
    if (size === 'symbolCard__scale--up') {
      setSelectedShadowClass('symbolCard__scale--up-shadow');
    } else {
      setSelectedShadowClass(
        isPositive
          ? 'symbolCard__content--trend-up'
          : isNegative
          ? 'symbolCard__content--trend-down'
          : ''
      );
    }
  }, [size]);

  useEffect(() => {
    setSelectedShadowClass(
      isPositive
        ? 'symbolCard__content--trend-up'
        : isNegative
        ? 'symbolCard__content--trend-down'
        : ''
    );
  }, [isPositive, isNegative]);

  const shakeClass = isPositive ? 'symbolCard__shake' : '';

  return (
    <div className={`symbolCard ${shakeClass}`}>
      <div onClick={handleOnClick} className={`symbolCard__content ${size} ${selectedShadowClass}`}>
        <div className="symbolCard__header">
          {id}
          <TrendIcon trend={trend} />
        </div>
        <div className="symbolCard__body">
          <CardPrice price={price} />
          {showCardInfo && (
            <>
              <CardRow icon={CompanyIcon} content={companyName} />
              <CardRow icon={IndustryLogo} content={industry} />
              <CardRow icon={MarketCapIcon} content={marketCap} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(SymbolCard);
