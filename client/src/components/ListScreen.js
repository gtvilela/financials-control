import React from "react";
const formatter = require("../helpers/formatterItems.js")

const EARNING_COLOR = "#81ecec";
const EXPENSE_COLOR = "#fab1a0";

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
        style={{ marginTop: "20px", marginBottom: "30px" }}
      />

      <div>
        <button
          style={{ marginTop: "20px", marginBottom: "30px" }}
          className="waves-effect waves-light btn"
          onClick={onNewTransaction}
        >
          + NOVO LANÇAMENTO
        </button>
      </div>
      {transactions.map((transaction) => {
        const currentColor =
          transaction.type === "+" ? EARNING_COLOR : EXPENSE_COLOR;
        return (
          <div
            key={transaction._id}
            style={{
              ...styles.transactionStyle,
              ...styles.flexStyle,
              padding: "10px",
              backgroundColor: currentColor,
              justifyContent: "space-between",
            }}
          >
            <div style={styles.flexStyle}>
              <div style={{marginRight: '20px'}}>{transaction.day} </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>
                  <strong>{transaction.category} </strong>
                </span>
                <span>{transaction.description}</span>
              </div>
            </div>
            <div>{formatter.formatCurrency(transaction.value)}</div>
            <div style={styles.buttonStyle}>
              <button
                className="waves-effect waves-light btn"
                id={transaction._id}
                onClick={onEditTransaction}
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                className="waves-effect waves-light btn red darken-4"
                onClick={onDeleteTransaction}
                id={transaction._id}
                style={{ marginLeft: "10px" }}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
const styles = {
  transactionStyle: {
    padding: "5px",
    margin: "5px",
    border: "1px solid lightgray",
    borderRadius: "5px",
  },
  flexStyle: {
    display: "flex",
    flexDirectuion: "row",
    alignItems: "center"
  },
};
