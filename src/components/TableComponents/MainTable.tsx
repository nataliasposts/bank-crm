import React from 'react';
import TransactionDto from 'src/types/TransactionDto';
import TextEnum from 'src/types/enum/TextEnum';

type MainTableProps = {
  searchValue: string;
  transactions: TransactionDto[];
  userId: string | undefined;
};

const MainTable: React.FC<MainTableProps> = ({
  searchValue,
  transactions,
  userId
}: MainTableProps) => {
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
                <React.Fragment key={t.key}>
                  <tr className="table-element click">
                    <th className="table-element">
                      {userId && userId === t.sourceId ? (
                        <p className="table-info">{TextEnum.INCOME_FIELD}</p>
                      ) : (
                        <p className="table-info">{TextEnum.OUTCOME_FIELD}</p>
                      )}
                    </th>
                    <th>
                      <p className="table-amount table-info">{t.amount}</p>
                    </th>
                  </tr>

                  {t.targetId === t.sourceId ? (
                    <tr className="table-element click">
                      <th className="table-element">
                        <p className="table-info">{TextEnum.OUTCOME_FIELD}</p>
                      </th>
                      <th>
                        <p className="table-amount table-info">{t.amount}</p>
                      </th>
                    </tr>
                  ) : null}
                </React.Fragment>
              ))
          : null}
      </tbody>
    </table>
  );
};

export default MainTable;
