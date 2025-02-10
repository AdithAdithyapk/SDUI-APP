import React, { useEffect, useState } from 'react';
import { UIComponentRenderer } from '../components/UIComponentRenderer';
import { UISchema } from '../../backend/types/ui-schema';

export const Dashboard = () => {
  const [uiSchema, setUiSchema] = useState(null as UISchema | null);

  useEffect(() => {
    // Fetch UI schema from backend
    fetch('/api/dashboard-ui')
      .then(res => res.json())
      .then(schema => setUiSchema(schema));
  }, []);

  if (!uiSchema) {
    return <div>Loading...</div>;
  }

  return (
    <UIComponentRenderer 
      component={uiSchema.layout} 
      data={uiSchema.data} 
    />
  );
}; 