import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import transactionApiService from 'src/api/transactionApiService';
import userApiService from 'src/api/userApiService';
import SearchComponent from 'src/components/SearchComponent/SearchComponent';
import TransactionDto from 'src/types/TransactionDto';
import UserDto from 'src/types/UserDto';
import UserTransactionDto from 'src/types/UserTransactionDto';
import TextEnum from 'src/types/enum/TextEnum';
import ViewType from 'src/types/enum/ViewTypeEnum';
import MainTable from 'src/components/TableComponents/MainTable';
import SortedTable from 'src/components/TableComponents/SortedTable';
import StyledUserPage from './StyledUserPage';
import getReactItemsWithKey from 'src/mapper/sharedMapper';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<UserDto>();
  const [transactions, setTransactions] = useState<UserTransactionDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionDto[]>([]);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewType, setViewType] = useState<ViewType.ALL | ViewType.INCOMING | ViewType.OUTCOMIG>(
    ViewType.ALL
  );
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (userId) {
      userApiService
        .fetchOneUser(userId)
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      transactionApiService
        .fetchUserTransactions(currentPage, 8, userId ? userId : '')
        .then((data) => {
          if (data) {
            setTransactions(data);
            setFilteredTransactions(data.userTransactions || []);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [user, currentPage]);

  const filterTransactions = () => {
    if (!transactions) return;

    const filtered =
      viewType === ViewType.INCOMING
        ? transactions.userTransactions.filter((t) => t.sourceId === user?.id)
        : viewType === ViewType.OUTCOMIG
        ? transactions.userTransactions.filter((t) => t.targetId === user?.id)
        : transactions.userTransactions;

    setFilteredTransactions(filtered);
  };

  useEffect(filterTransactions, [viewType, transactions]);

  const handleSearch = useCallback((value: string) => setSearchValue(value), []);
  const handlePreviousPage = () => setCurrentPage((page) => Math.max(1, page - 1));
  const handleNextPage = () => setCurrentPage((page) => page + 1);

  return (
    <StyledUserPage>
      <div className="container">
        <div className="personal-info-row">
          <p className="name"> {user?.name}</p>
          {isLoading ? null : (
            <p className="amount">
              <span className="amount-title">Amount:</span> {transactions?.finalSum.toFixed(2)}
            </p>
          )}
        </div>
        <div className="transaction-table">
          <SearchComponent onSearch={handleSearch} />
          <div className="button-row">
            <button onClick={() => setViewType(ViewType.ALL)} className="button" type="button">
              <p>{TextEnum.ALL}</p>
            </button>
            <button onClick={() => setViewType(ViewType.OUTCOMIG)} className="button" type="button">
              <p>{TextEnum.OUTCOME}</p>
            </button>
            <button onClick={() => setViewType(ViewType.INCOMING)} className="button" type="button">
              <p>{TextEnum.INCOME}</p>
            </button>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {viewType === ViewType.ALL && (
                <MainTable
                  searchValue={searchValue}
                  transactions={getReactItemsWithKey(filteredTransactions)}
                  userId={user?.id}
                />
              )}
              {viewType === ViewType.INCOMING && (
                <SortedTable
                  text={TextEnum.INCOME_FIELD}
                  transactions={getReactItemsWithKey(filteredTransactions)}
                  searchValue={searchValue}
                />
              )}
              {viewType === ViewType.OUTCOMIG && (
                <SortedTable
                  text={TextEnum.OUTCOME_FIELD}
                  transactions={getReactItemsWithKey(filteredTransactions)}
                  searchValue={searchValue}
                />
              )}
              <div className="pagination-buttons">
                <button onClick={handlePreviousPage} className="button" type="button">
                  <p> {TextEnum.PREVIOUS_BUTTON}</p>
                </button>
                <button onClick={handleNextPage} className="button" type="button">
                  <p> {TextEnum.NEXT_BUTTON}</p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </StyledUserPage>
  );
};

export default UserPage;
