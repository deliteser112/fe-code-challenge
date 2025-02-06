import './symbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateActiveSymbol, selectors } from '@/store/stocksSlice';

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectors.activeSymbol);
  const handleSymbolClick = (symbolId: string) => {
    dispatch(updateActiveSymbol(activeSymbol === symbolId ? null : symbolId));
  };

  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__chart">
        <h3>PRICE HISTORY</h3>
        <PriceChart symbolId={activeSymbol} />
      </div>
      <div className="symbolsView__content">
        <div className="symbolsView__cards">
          <SymbolsGrid activeSymbol={activeSymbol} onSymbolClick={handleSymbolClick} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
