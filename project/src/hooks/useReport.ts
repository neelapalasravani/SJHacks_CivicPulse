import { useContext } from 'react';
import { ReportContext } from '../contexts/ReportContext';

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};