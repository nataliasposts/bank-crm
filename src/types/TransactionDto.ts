import ReactItem from './ReactItem';

type TransactionDto = {
  sourceId: string;
  targetId: string;
  amount: number;
} & ReactItem;

export default TransactionDto;
