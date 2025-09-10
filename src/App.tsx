import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-community';

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

const TransactionTable = () => {
  const [rowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ]);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
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
