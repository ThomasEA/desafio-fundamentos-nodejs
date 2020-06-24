import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (value, transaction) =>
        value + (transaction.type === 'income' ? transaction.value : 0),
      0,
    );

    const outcome = this.transactions.reduce(
      (value, transaction) =>
        value + (transaction.type === 'outcome' ? transaction.value : 0),
      0,
    );

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create(dto: CreateTransactionDto): Transaction {
    const transaction = new Transaction(dto);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
