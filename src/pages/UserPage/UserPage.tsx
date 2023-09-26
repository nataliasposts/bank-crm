import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import transactionApiService from 'src/api/transactionApiService';
import userApiService from 'src/api/userApiService';
import SearchComponent from 'src/components/SearchComponent/SearchComponent';
import TransactionDto from 'src/types/TransactionDto';
import UserDto from 'src/types/UserDto';
import UserTransactionDto from 'src/types/UserTransactionDto';
import TextEnum from 'src/types/enum/TextEnum';
import StyledUserPage from './StyledUserPage';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<UserDto>();
  const [sourceArray, setSourceArray] = useState<TransactionDto[]>([]);
  const [targetArray, setTargetArray] = useState<TransactionDto[]>([]);
  const [transactions, setTransactions] = useState<UserTransactionDto>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortedTable, setSortedTable] = useState<TransactionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    if (userId) {
      userApiService
        .fetchOneUser(userId)
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching one user:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      transactionApiService
        .fetchUserTransactions(currentPage, itemsPerPage, userId ? userId : '')
        .then((data) => {
          if (data) {
            setTransactions(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, currentPage]);

  const userTransaction = useMemo(() => {
    return transactions?.userTransactions || [];
  }, [transactions]);

  useEffect(() => {
    if (user && transactions) {
      const sourceTransactions = transactions.userTransactions.filter(
        (transaction) => transaction.sourceId === user.id
      );

      const targetTransactions = transactions.userTransactions.filter(
        (transaction) => transaction.targetId === user.id
      );

      setSourceArray(sourceTransactions);
      setTargetArray(targetTransactions);
      setSortedTable(userTransaction);
    }
  }, [user, transactions, userTransaction]);

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const showOnlyOutcoming = () => {
    setSortedTable(sourceArray ?? []);
  };

  const showOnlyIncoming = () => {
    setSortedTable(targetArray ?? []);
  };

  const showAll = () => {
    setSortedTable(userTransaction);
  };

  useEffect(() => {
    setSortedTable(userTransaction);
  }, [transactions]);

  const handlePreviousPage = () => {
    setSortedTable(userTransaction);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setSortedTable(userTransaction);
    setCurrentPage((prevState) => prevState + 1);
  };

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
        <div className="trabsaction-table">
          <SearchComponent onSearch={handleSearch} />
          <div className="button-row">
            <button type="button" onClick={showAll} className="button">
              <p>{TextEnum.ALL}</p>
            </button>
            <button type="button" onClick={showOnlyOutcoming} className="button">
              <p>{TextEnum.OUTCOME}</p>
            </button>
            <button type="button" onClick={showOnlyIncoming} className="button">
              <p>{TextEnum.INCOME}</p>
            </button>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <table className="table">
                <thead>
                  <tr className="table-element">
                    <th className="table-element header-table-element">
                      <p>{TextEnum.TRANSACTION}</p>
                    </th>
                    <th className="table-element header-table-element">
                      <p>{TextEnum.AMOUNT}</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTable.length > 0
                    ? sortedTable
                        .filter((t) => t.amount.toString().includes(searchValue))
                        .map((t) => (
                          <tr className="table-element click" key={t.key}>
                            <th className="table-element">
                              {user?.id === t.sourceId ? (
                                <p className="table-info">{t.sourceId}</p>
                              ) : (
                                <p className="table-info">{t.targetId}</p>
                              )}
                            </th>
                            <th>
                              <p className="table-amount table-info">{t.amount}</p>
                            </th>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
              <div className="pagination-buttons">
                <button onClick={handlePreviousPage} className="button" type="button">
                  <p> {TextEnum.PREVIOUS_BUTTON}</p>
                </button>
                <button onClick={handleNextPage} className="button" type="button">
                  <p> {TextEnum.NEXT_BUTTON}</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledUserPage>
  );
};

export default UserPage;
