import React, { memo } from 'react';

interface ICardPriceProp {
  price: number;
}

const CardPrice = ({ price }: ICardPriceProp) => {
  return (
    <div className="symbolCard__price-container">
      <div className="text-bold">PRICE:</div>
      <div className="symbolCard__price text-bold">${Math.floor(price) || 0}</div>
    </div>
  );
};

export default memo(CardPrice);
