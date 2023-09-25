import { useCallback, useEffect, useState } from 'react';
import StyledMainPage from './StyledMainPage';
import UserDto from '../../types/UserDto';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import userApiService from '../../api/userApiService';
import RoutingPath from '../../routes/routing';
import { useNavigate } from 'react-router-dom';
import TextEnum from '../../types/enum/TextEnum';

const MainPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    userApiService
      .fetchUsers()
      .then((data) => {
        setUsersList(data || []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
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
        </div>
      </div>
    </StyledMainPage>
  );
};

export default MainPage;
