import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Report } from '../types/Location';

interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'createdAt'>) => void;
  getReportsByUser: (userId: string) => Report[];
  totalReports: number;
}

const ReportContext = createContext<ReportContextType>({
  reports: [],
  addReport: () => {},
  getReportsByUser: () => [],
  totalReports: 0,
});

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (user) {
      const storedReports = localStorage.getItem(`reports_${user.id}`);
      if (storedReports) {
        setReports(JSON.parse(storedReports));
      }
    }
  }, [user]);

  const addReport = (reportData: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport: Report = {
      ...reportData,
      id: `report_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setReports(prev => {
      const updatedReports = [...prev, newReport];
      if (user) {
        localStorage.setItem(`reports_${user.id}`, JSON.stringify(updatedReports));
      }
      return updatedReports;
    });
  };

  const getReportsByUser = (userId: string) => {
    return reports.filter(report => report.userId === userId);
  };

  return (
    <ReportContext.Provider 
      value={{ 
        reports, 
        addReport, 
        getReportsByUser,
        totalReports: reports.length,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext }