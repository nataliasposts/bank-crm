import ReactItem from './ReactItem';
import TransactionDto from './TransactionDto';

type UserTransactionDto = {
  userTransactions: TransactionDto[];
  finalSum: number;
} & ReactItem;

export default UserTransactionDto;
