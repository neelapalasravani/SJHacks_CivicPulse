import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Location } from '../../types/Location';

interface ReportButtonProps {
  location: Location;
}

const ReportButton: React.FC<ReportButtonProps> = ({ location }) => {
  const navigate = useNavigate();

  const handleReportClick = () => {
    // Store location data in sessionStorage for the report form
    sessionStorage.setItem('reportLocation', JSON.stringify({
      id: location.id,
      name: location.name,
      type: location.type,
      address: location.address
    }));

    // Navigate to the report form
    navigate('/support');
  };

  return (
    <button 
      onClick={handleReportClick}
      className="btn btn-primary text-sm py-2"
    >
      <Camera className="h-4 w-4 mr-2" />
      Report Issue
    </button>
  );
};

export default ReportButton;