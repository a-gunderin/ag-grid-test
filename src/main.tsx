import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import GridExample from './App';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GridExample />
  </StrictMode>
);
