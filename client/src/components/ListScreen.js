import React from 'react';

const EARNING_COLOR = '#81ecec';
const EXPENSE_COLOR = '#fab1a0';

export default function ListScreen({
  onEditTransaction,
  transactions,
  periods,
  onDeleteTransaction,
  filteredText,
  onFilterChange,
  onPeriodChange,
  currentPeriod,
  onNewTransaction,
}) {
  return (
    <div>
      <select
        className="browser-default"
        value={currentPeriod}
        onChange={onPeriodChange}
      >
        {periods.map((period) => {
          return <option key={period}>{period}</option>;
        })}
      </select>

      <input
        type="text"
        placeholder="Filtro"
        value={filteredText}
        onChange={onFilterChange}
        style={{ marginTop: '20px', marginBottom: '30px' }}
      />

      <div>
        <button
          style={{ marginTop: '20px', marginBottom: '30px' }}
          className="waves-effect waves-light btn"
          onClick={onNewTransaction}
        >
          + NOVO LANÇAMENTO
        </button>
      </div>
      {transactions.map((transaction) => {
        const currentColor =
          transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;
        return (
          <div
            key={transaction._id}
            style={{
              ...styles.transactionStyle,
              backgroundColor: currentColor,
            }}
          >
            <span style={styles.buttonStyle}>
              <button
                className="waves-effect waves-light btn"
                id={transaction._id}
                onClick={onEditTransaction}
              >
                Editar
              </button>
              <button
                className="waves-effect waves-light btn red darken-4"
                onClick={onDeleteTransaction}
                id={transaction._id}
                style={{ marginLeft: '10px' }}
              >
                X
              </button>
            </span>
            <span>
              {transaction.yearMonthDay} -{' '}
              <strong>{transaction.category} </strong> -{' '}
              {transaction.description} - {transaction.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
const styles = {
  transactionStyle: {
    padding: '5px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '5px',
  },
  buttonStyle: {
    margin: '10px',
  },
};
