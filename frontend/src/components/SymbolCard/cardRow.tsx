import React, { memo } from 'react';

interface ICardRowProp {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  content: string | number;
}

const CardRow = ({ icon: Icon, content }: ICardRowProp) => {
  return (
    <div className="symbolCard__row">
      <Icon width="24" height="24" />
      <div className="align-right">{content}</div>
    </div>
  );
};

export default memo(CardRow);
