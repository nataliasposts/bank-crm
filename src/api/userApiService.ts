import getReactItemsWithKey from '../mapper/sharedMapper';
import UserDto from '../types/UserDto';
import apiRequest from './apiRequest';

const userApiService: IApiService = {
  fetchUsers: async () => {
    try {
      const response = await apiRequest<UserDto[]>({
        method: 'GET',
        endpoint: `http://165.22.17.207:5000/users`
      });
      return getReactItemsWithKey(response as UserDto[]);
    } catch (error) {
      console.error('Error in fetchUsers');
      return null;
    }
  },
  fetchOneUser: async (userId: string) => {
    try {
      const response = await apiRequest<UserDto | null>({
        method: 'GET',
        endpoint: `http://165.22.17.207:5000/users/${userId}`
      });
      return response;
    } catch (error) {
      console.error('Error in fetchOneUsers');
      return null;
    }
  }
};

interface IApiService {
  fetchUsers: () => Promise<UserDto[] | null>;
  fetchOneUser: (userId: string) => Promise<UserDto | null>;
}

export default userApiService;
