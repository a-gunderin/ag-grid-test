import transaction_types_data from '../data/transaction-types.json';
import deals_data from '../data/deals.json';

export const getTransactionTypeById = (id: number) =>
  transaction_types_data.find((type) => type.id === id)?.name || 'Unknown Type';

export const getDealByInstrumentId = (id: number) =>
  deals_data.find((deal) => (deal.instrumentIds as number[]).includes(id))
    ?.instruments[0].name || 'Unknown Deal';
