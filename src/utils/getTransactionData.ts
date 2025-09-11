import transaction_types_data from '../data/transaction-types.json';
import deals_data from '../data/deals.json';
import customers_data from '../data/customers.json';
import roles_data from '../data/roles.json';
import loans_data from '../data/loans.json';
import bank_accounts_data from '../data/bank-accounts.json';
import transactions_data from '../data/transactions.json';

export const getTransactionTypeName = (id: number) =>
  transaction_types_data.find((type) => type.id === id)?.name || 'Unknown Type';

export const getDealName = (instrumentId: number) =>
  deals_data.find((deal) =>
    (deal.instrumentIds as number[]).includes(instrumentId)
  )?.name || 'Unknown Deal';

export const getInstrumentName = (instrumentId: number) =>
  deals_data.find((deal) =>
    (deal.instrumentIds as number[]).includes(instrumentId)
  )?.instruments[0].name || 'Unknown Instrument';

export const getCustomerName = (customerId: number) =>
  customers_data.find((customer) => customer.id === customerId)?.name ||
  'Unknown Customer';

export const getRoleName = (instrumentId: number, customerId: number) => {
  const deal = deals_data.find((deal) =>
    (deal.instrumentIds as number[]).includes(instrumentId)
  );
  const roleId =
    deal?.dealCustomerRoles.find((dcr) => dcr.customerId === customerId)
      ?.roleId || 100;
  const roleName =
    roles_data.find((role) => role.id === roleId)?.name || 'Unknown Role';
  return roleName;
};

export const getPaymentDate = (instrumentId: number) =>
  loans_data.find((loan) => loan.id === instrumentId)?.issueDate ||
  'Unknown Date';

export const formatAmount = (amount: number, currencyCode: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const getBankData = (remittanceId?: number) => {
  const bankAccount = bank_accounts_data.find(
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
    const currentTransaction = transactions_data.find(
      (transaction) => transaction.id === currentId
    );
    if (!currentTransaction) break;
    path.unshift(currentTransaction.id);
    currentId = currentTransaction.parentTransactionId;
  }

  return path;
};
