import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import Loading from '../Loading';
import '../SymbolCard/symbolCard.css';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

type SymbolsGridProps = {
  activeSymbol: string | null;
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick, activeSymbol }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const itemPrices = useAppSelector((state) => state.prices);
  const { loading, error } = useAppSelector((state) => state.stocks.apiState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {loading ? (
        <Loading />
      ) : !error ? (
        stockSymbols.map((id, i) => (
          <SymbolCard
            price={itemPrices[id]}
            size={
              !activeSymbol
                ? ''
                : activeSymbol === id
                ? 'symbolCard__scale--up'
                : 'symbolCard__scale--down'
            }
            onClick={onSymbolClick}
            key={id}
            id={id}
          />
        ))
      ) : (
        <div>Failed to get stocks!</div>
      )}
    </div>
  );
};

export default SymbolsGrid;
