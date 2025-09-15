import deals from '../data/deals.json';
import customers from '../data/customers.json';
import bankAccounts from '../data/bank-accounts.json';
import transactions from '../data/transactions.json';

const transactionsIndex = new Map();
const dealsIndex = new Map();
const dealsInstrumnetsIndex = new Map();
const customersIndex = new Map();
const bankAccountsIndex = new Map();

transactions.forEach((t) => transactionsIndex.set(t.id, t));

deals.forEach((d) => {
  dealsIndex.set(d.id, d);
  d.instruments.forEach((di) => dealsInstrumnetsIndex.set(di.id, di));
});

customers.forEach((c) => customersIndex.set(c.id, c));

bankAccounts.forEach((b) => bankAccountsIndex.set(b.id, b));

export {
  transactionsIndex,
  dealsIndex,
  dealsInstrumnetsIndex,
  customersIndex,
  bankAccountsIndex,
};
