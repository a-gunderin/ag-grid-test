import transactionTypes from '../data/transaction-types.json';
import deals from '../data/deals.json';
import customers from '../data/customers.json';
import roles from '../data/roles.json';
import loans from '../data/loans.json';
import bankAccounts from '../data/bank-accounts.json';
import transactions from '../data/transactions.json';

export const getTransactionTypeName = (id: number) =>
  transactionTypes.find((type) => type.id === id)?.name || 'Unknown Type';

export const getDealName = (instrumentId: number) =>
  deals.find((deal) => (deal.instrumentIds as number[]).includes(instrumentId))
    ?.name || 'Unknown Deal';

export const getInstrumentName = (instrumentId: number) =>
  deals.find((deal) => (deal.instrumentIds as number[]).includes(instrumentId))
    ?.instruments[0].name || 'Unknown Instrument';

export const getCustomerName = (customerId: number) =>
  customers.find((customer) => customer.id === customerId)?.name ||
  'Unknown Customer';

export const getRoleName = (instrumentId: number, customerId: number) => {
  const deal = deals.find((deal) =>
    (deal.instrumentIds as number[]).includes(instrumentId)
  );
  const roleId =
    deal?.dealCustomerRoles.find((dcr) => dcr.customerId === customerId)
      ?.roleId || 100;
  const roleName =
    roles.find((role) => role.id === roleId)?.name || 'Unknown Role';
  return roleName;
};

export const getPaymentDate = (instrumentId: number) =>
  loans.find((loan) => loan.id === instrumentId)?.issueDate || 'Unknown Date';

export const formatAmount = (amount: number, currencyCode: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const getBankData = (remittanceId?: number) => {
  const bankAccount = bankAccounts.find(
    (bankAcco) => bankAcco.id === remittanceId
  );
  return {
    accountNumber: bankAccount?.number,
    bankName: bankAccount?.bankBranch.name,
  };
};

export const getHierarchyPath = (transactionId: number) => {
  const path = [];
  let currentId: number | undefined = transactionId;

  while (currentId !== undefined) {
    const currentTransaction = transactions.find(
      (transaction) => transaction.id === currentId
    );
    if (!currentTransaction) break;
    path.unshift(currentTransaction.id);
    currentId = currentTransaction.parentTransactionId;
  }

  return path;
};
