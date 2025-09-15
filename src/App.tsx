import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import transactions from './data/transactions.json';
import {
  formatAmount,
  getBankData,
  getCustomerName,
  getDealName,
  getHierarchyPath,
  getInstrumentName,
  getPaymentDate,
  getRoleName,
  getTransactionTypeName,
} from './utils/getTransactionData';

interface IRow {
  'Transaction Type': string;
  Deal: string;
  Instrument: string;
  Customer: string;
  Role: string;
  'Payment Date': string;
  'Effective Date': string;
  CCY: string;
  Amount: number;
  'Bank Account'?: string;
  Bank?: string;
}

const transactionsData = transactions.map((transaction) => {
  return {
    id: transaction.id,
    path: getHierarchyPath(transaction.id),
    'Transaction Type': getTransactionTypeName(transaction.transactionTypeId),
    Deal: getDealName(transaction.instrumentId),
    Instrument: getInstrumentName(transaction.instrumentId),
    Customer: getCustomerName(transaction.customerId),
    Role: getRoleName(transaction.instrumentId, transaction.customerId),
    'Payment Date': getPaymentDate(transaction.instrumentId),
    'Effective Date': transaction.effectiveDate,
    CCY: transaction.currencyCode,
    Amount: transaction.amount,
    'Bank Account': getBankData(transaction.remittanceId).accountNumber,
    Bank: getBankData(transaction.remittanceId).bankName,
  };
});

const TransactionTable = () => {
  const [rowData] = useState<IRow[]>(transactionsData);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: 'Deal', filter: true },
    { field: 'Instrument', filter: true },
    { field: 'Customer', filter: true },
    { field: 'Role', filter: true },
    { field: 'Payment Date', filter: true },
    { field: 'Effective Date', filter: true },
    { field: 'CCY', filter: true },
    {
      field: 'Amount',
      filter: 'agNumberColumnFilter',
      cellClass: 'ag-right-aligned-cell',
      valueFormatter: (params) => formatAmount(params.value, params.data!.CCY),
    },
    { field: 'Bank Account', filter: true },
    { field: 'Bank', filter: true },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <h1 className="p-3 text-lg text-gray-500 font-medium tracking-wider">
        Transactions
      </h1>

      <div className="w-full h-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          treeData={true}
          animateRows={true}
          getDataPath={(data) => data.path}
          autoGroupColumnDef={{
            headerName: 'Transaction Type',
            field: 'Transaction Type',
            filter: true,
            cellRendererParams: { suppressCount: true },
          }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
};

export default TransactionTable;
