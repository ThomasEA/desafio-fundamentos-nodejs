import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(dto: CreateTransactionServiceDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    const outcomeValue = (dto.type === 'outcome' && dto.value) || 0;

    if (balance.total < outcomeValue) {
      throw Error('Insuficient funds');
    }

    return this.transactionsRepository.create(dto);
  }
}

export default CreateTransactionService;
