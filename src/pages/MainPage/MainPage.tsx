import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApiService from 'src/api/userApiService';
import SearchComponent from 'src/components/SearchComponent/SearchComponent';
import RoutingPath from 'src/routes/routing';
import UserDto from 'src/types/UserDto';
import TextEnum from 'src/types/enum/TextEnum';
import StyledMainPage from './StyledMainPage';

const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    userApiService
      .fetchUsers()
      .then((data) => {
        setUsersList(data || []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortByAlbhabet = (users: UserDto[]) => {
    return Array.from(users).sort((a, b) => a.name.localeCompare(b.name));
  };

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const goToUserDetails = (user: UserDto) => {
    navigate(RoutingPath.UserPage.replace(':userId', String(user.id)));
  };

  return (
    <StyledMainPage>
      <div className="container">
        <div className="row">
          <SearchComponent onSearch={handleSearch} />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="table">
              <thead>
                <tr className="table-element">
                  <th className="table-element header-table-element">
                    <p>{TextEnum.CLIENT_INFO}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList.length > 0
                  ? sortByAlbhabet(usersList)
                      .filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()))
                      .map((user) => (
                        <tr
                          className="table-element click"
                          key={user.key}
                          onClick={() => goToUserDetails(user)}
                        >
                          <th className="table-element">
                            <p className="user-info">{user.name}</p>
                          </th>
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </StyledMainPage>
  );
};

export default MainPage;
