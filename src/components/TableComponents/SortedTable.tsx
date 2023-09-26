import TransactionDto from 'src/types/TransactionDto';
import TextEnum from 'src/types/enum/TextEnum';

type SortedTableProps = {
  text: string;
  transactions: TransactionDto[];
  searchValue: string;
};

const SortedTable: React.FC<SortedTableProps> = ({
  text,
  transactions,
  searchValue
}: SortedTableProps) => {
  return (
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
        {transactions.length > 0
          ? transactions
              .filter((t) => t.amount.toString().includes(searchValue))
              .map((t) => (
                <tr className="table-element click" key={t.key}>
                  <th className="table-element">
                    <p className="table-info">{text}</p>
                  </th>
                  <th>
                    <p className="table-amount table-info">{t.amount}</p>
                  </th>
                </tr>
              ))
          : null}
      </tbody>
    </table>
  );
};

export default SortedTable;
