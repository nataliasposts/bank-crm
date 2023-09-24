import { useParams } from 'react-router-dom';
import StyledUserPage from './StyledUserPage';
import userApiService from '../../api/userApiService';
import { useEffect, useState } from 'react';
import UserDto from '../../types/UserDto';
import transactionApiService from '../../api/transactionApiService';
import TransactionDto from '../../types/TransactionDto';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import TextEnum from '../../types/enum/TextEnum';

const UserPage = () => {
  const [user, setUser] = useState<UserDto>();
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [sourceArray, setSourceArray] = useState<TransactionDto[]>([]);
  const [targetArray, setTargetArray] = useState<TransactionDto[]>([]);
  const [userTransactions, setUserTransactions] = useState<TransactionDto[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortedTable, setSortedTable] = useState<TransactionDto[]>([]);
  const [finalSum, setFinalSum] = useState<number>(0);
  const { userId } = useParams();

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
    if (user !== null) {
      transactionApiService
        .fetchTransactions()
        .then((data) => {
          if (data) {
            setTransactions(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && transactions.length > 0) {
      const userTransaction = transactions.filter(
        (transaction) => transaction.sourceId === user.id || transaction.targetId === user.id
      );
      const sourceTransactions = userTransaction.filter(
        (transaction) => transaction.sourceId === user.id
      );
      const targetTransactions = userTransaction.filter(
        (transaction) => transaction.targetId === user.id
      );
      setSourceArray(sourceTransactions);
      setTargetArray(targetTransactions);
      setUserTransactions(userTransaction);
    }
  }, [user, transactions]);

  useEffect(() => {
    const sourceSum = sourceArray.reduce((total, currentValue) => total + currentValue.amount, 0);
    const targetSum = targetArray.reduce((total, currentValue) => total + currentValue.amount, 0);
    const newFinalSum = sourceSum - targetSum;
    setFinalSum(newFinalSum);
  }, [sourceArray, targetArray]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const showOnlyOutcoming = () => {
    setSortedTable(sourceArray ? sourceArray : []);
  };

  const showOnlyIncoming = () => {
    setSortedTable(targetArray ? targetArray : []);
  };

  const showAll = () => {
    setUserTransactions([]);
    const userTransaction = transactions.filter(
      (transaction) => transaction.sourceId === user?.id || transaction.targetId === user?.id
    );
    setUserTransactions(userTransaction);
  };

  useEffect(() => {
    setSortedTable(userTransactions);
  }, [userTransactions]);

  return (
    <StyledUserPage>
      <div className="container">
        <div className="personal-info-row">
          <p className="name">{user?.name}</p>
          <p className="amount">
            <span className="amount-title">Amount:</span> {finalSum.toFixed(2)}
          </p>
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
              {sortedTable.length > 0 &&
                sortedTable
                  .filter((t) => t.amount.toString().includes(searchValue))
                  .map((t) => (
                    <tr className="table-element click" key={t.key}>
                      <th className="table-element">
                        <p>{t.sourceId}</p>
                      </th>
                      <th>
                        <p className="table-amount">{t.amount}</p>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </StyledUserPage>
  );
};

export default UserPage;
