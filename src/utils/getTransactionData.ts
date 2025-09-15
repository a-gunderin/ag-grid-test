import transactionTypes from '../data/transaction-types.json';
import transactionsMapping from '../data/transaction-mappings.json';
import {
  bankAccountsIndex,
  customersIndex,
  dealsIndex,
  dealsInstrumnetsIndex,
  transactionsIndex,
} from './dataIndexes';

export const getTransactionTypeName = (transactionId: number) => {
  const currentTransactionTypeId =
    transactionsIndex.get(transactionId)!.transactionTypeId;
  return transactionTypes[currentTransactionTypeId].name;
};

export const getDealName = (instrumentId: number) => {
  const dealId = dealsInstrumnetsIndex.get(instrumentId)?.dealId;
  return dealsIndex.get(dealId).name;
};

export const getInstrumentName = (instrumentId: number) =>
  dealsInstrumnetsIndex.get(instrumentId).name;

export const getCustomerName = (customerId: number) =>
  customersIndex.get(customerId).name;

export const getRoleName = (transactionId: number) => {
  const currentTransactionTypeId =
    transactionsIndex.get(transactionId)!.transactionTypeId;
  return transactionsMapping[currentTransactionTypeId].name;
};

export const getPaymentDate = (transactionId: number) =>
  transactionsIndex.get(transactionId)?.paymentDate;

export const formatAmount = (amount: number, currencyCode: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const getBankData = (remittanceId?: number) => {
  const bankAccount = bankAccountsIndex.get(remittanceId);
  return {
    accountNumber: bankAccount?.number,
    bankName: bankAccount?.bankBranch.name,
  };
};

export const getHierarchyPath = (transactionId: number) => {
  const path = [];
  let currentId: number | undefined = transactionId;

  while (currentId !== undefined) {
    const currentTransaction = transactionsIndex.get(currentId);
    if (!currentTransaction) break;
    path.unshift(currentTransaction.id);
    currentId = currentTransaction.parentTransactionId;
  }

  return path;
};
