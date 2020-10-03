const express = require("express");
const transactionRouter = express.Router();
const service = require("../services/transactionService");

transactionRouter.get("/", async (req, res) => {
  const { query } = req;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm`
      );
    }
    const { period } = query;

    if (period.length !== 7) {
      throw new Error(`Período inválido. Use o formato yyyy-mm`);
    }

    //MongoDB
    const filteredTransactions = await service.getTransactionsFrom(period);

    res.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions,
    });
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

transactionRouter.post("/", async (req, res) => {
  const { body } = req;

  try {
    if (JSON.stringify(body) === "{}") {
      throw new Error(`Conteúdo inexistente!`);
    }

    const { description, value, category, type, month, day, year } = body;
    //MongoDB
    const newTransaction = await service.postTransaction({
      description,
      value,
      category,
      type,
      month,
      day,
      year,
      yearMonth: `${year}-${month.toString().padStart(2, "0")}`,
      yearMonthDay: `${year}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    });

    res.send({
      status: "OK",
      transaction: newTransaction,
    });
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

transactionRouter.put("/:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    if (JSON.stringify(body) === "{}") {
      throw new Error(`Conteúdo inexistente!`);
    }
    const { description, value, category, type, month, day, year } = body;
    const { id } = params;
    //MongoDB
    const updatedTransaction = await service.putTransaction(id, {
      description,
      value,
      category,
      type,
      month,
      day,
      year,
      yearMonth: `${year}-${month.toString().padStart(2, "0")}`,
      yearMonthDay: `${year}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    });
    res.send({
      status: "OK",
      transaction: updatedTransaction,
    });
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

transactionRouter.put("/", async (req, res) => {
  try {
    throw new Error(`Id inexistente!`);
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

transactionRouter.delete("/:id", async (req, res) => {
  const { params } = req;
  console.log(params);

  try {
    const { id } = params;
    const didDelete = await service.deleteTransaction(id);

    if(didDelete) {
      res.send({
        status: "OK",
        message: `Lançamento de id ${id} excluído com sucesso.`
      });
    }
    else {
      throw new Error('Não foi possível excluir.')
    }
    
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

transactionRouter.delete("/", async (req, res) => {
  try {
    throw new Error(`Id inexistente!`);
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
});

module.exports = transactionRouter;
