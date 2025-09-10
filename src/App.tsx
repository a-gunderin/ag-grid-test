import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-community';

interface IRow {
  'Transaction Type': string;
  Deal: string;
  Instrument: string;
  Customer: string;
  Role: string;
  'Payment Date': string;
  'Effective Date': string;
  CCY: string;
  Amount: string;
}

const TransactionTable = () => {
  const [rowData] = useState<IRow[]>([
    {
      'Transaction Type': 'some',
      Deal: 'some',
      Instrument: 'some',
      Customer: 'some',
      Role: 'some',
      'Payment Date': 'some',
      'Effective Date': 'some',
      CCY: 'some',
      Amount: 'some',
    },
  ]);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: 'Transaction Type' },
    { field: 'Deal' },
    { field: 'Instrument' },
    { field: 'Customer' },
    { field: 'Role' },
    { field: 'Payment Date' },
    { field: 'Effective Date' },
    { field: 'CCY' },
    { field: 'Amount' },
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
        />
      </div>
    </>
  );
};

export default TransactionTable;
