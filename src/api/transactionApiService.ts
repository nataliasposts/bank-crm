import getReactItemsWithKey from '../mapper/sharedMapper';
import TransactionDto from '../types/TransactionDto';
import apiRequest from './apiRequest';

const transactionApiService: IApiService = {
  fetchTransactions: async () => {
    try {
      const response = await apiRequest<TransactionDto[] | null>({
        method: 'GET',
        endpoint: 'http://localhost:5000/transactions'
      });
      return getReactItemsWithKey(response as TransactionDto[]);
    } catch (error) {
      console.error('Error in fetchTransactions');
      return null;
    }
  }
};

interface IApiService {
  fetchTransactions: () => Promise<TransactionDto[] | null>;
}

export default transactionApiService;
