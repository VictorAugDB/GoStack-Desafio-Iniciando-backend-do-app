import { DeleteResult, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransactionExists = transactionsRepository.findOne({
      where: { id },
    });

    if (!checkTransactionExists) {
      throw new AppError('This transaction does not exists');
    }

    const deleteTransaction = await transactionsRepository.delete(id);

    return deleteTransaction;
  }
}

export default DeleteTransactionService;
