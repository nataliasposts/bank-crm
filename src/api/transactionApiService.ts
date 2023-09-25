import { addKeyToReactItem } from '../mapper/sharedMapper';
import UserTransactionDto from '../types/UserTransactionDto';
import apiRequest from './apiRequest';

const transactionApiService: IApiService = {
  fetchUserTransactions: async (page: number, limit: number, userId: string) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      queryParams.append('userId', userId);

      const response = await apiRequest<UserTransactionDto | null>({
        method: 'GET',
        endpoint: `http://165.22.17.207:5000/transactions?${queryParams}`
      });
      return addKeyToReactItem(response as UserTransactionDto);
    } catch (error) {
      console.error('Error in fetchTransactions');
      return null;
    }
  }
};

interface IApiService {
  fetchUserTransactions: (
    page: number,
    limit: number,
    userId: string
  ) => Promise<UserTransactionDto | null>;
}

export default transactionApiService;
