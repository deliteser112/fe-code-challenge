import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

type historyEntry = {
  time: number;
  price: number;
};

type PriceHistoryResponse = {
  symbol: string | null;
  history: historyEntry[];
};

type PriceHistoryState = {
  symbol: string | null;
  history: historyEntry[];
  apiState: {
    loading: boolean | null;
    error: boolean;
    activeRequests: number;
  };
};

const initialState: PriceHistoryState = {
  symbol: null,
  history: [],
  apiState: {
    loading: null,
    error: false,
    activeRequests: 0
  }
};

let controller = new AbortController();

export const fetchPriceHistory = createAsyncThunk(
  'stocks/fetchPriceHistory',
  // if you type your function argument here
  async (symbolId: string, thunkAPI) => {
    controller.abort();
    controller = new AbortController();
    const response = await fetch(`http://localhost:3100/api/stock/history/${symbolId}`, {
      signal: controller.signal // Use the signal for potential cancellation
    });

    return (await response.json()) as PriceHistoryResponse;
  }
);

const selectSymbolInfo = (state: RootState) => state.priceHistory.symbol;
const selectPriceHistory = (state: RootState) => state.priceHistory.history;
const apiState = (state: RootState) => state.priceHistory.apiState;

const priceHistorySlice = createSlice({
  name: 'priceHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPriceHistory.fulfilled, (state, action) => {
      const { symbol, history } = action.payload;
      state.apiState.error = false;
      state.apiState.activeRequests -= 1;
      if (state.apiState.activeRequests === 0) {
        state.apiState.loading = false;
      }
      state.history = history;
      state.symbol = symbol;
    });

    builder.addCase(fetchPriceHistory.rejected, (state, action) => {
      state.apiState.error = true;
      state.apiState.activeRequests -= 1;

      if (state.apiState.activeRequests === 0) {
        state.apiState.loading = false;
      }
    });

    builder.addCase(fetchPriceHistory.pending, (state, action) => {
      state.apiState.error = false;
      state.apiState.activeRequests += 1;
      state.apiState.loading = true;
    });
  }
});

const selectors = {
  selectPriceHistory,
  selectSymbolInfo,
  apiState
};

export default priceHistorySlice;
export { selectors };
