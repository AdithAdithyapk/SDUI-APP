import React from 'react';
import { Layout, Header, Sidebar, Grid, Card, Chart, DataDisplay, Footer } from './components/index';
import { UIComponent } from '../../backend/types/ui-schema';

const componentMap: { [key: string]: any } = {
  Layout,
  Header,
  Sidebar,
  Grid,
  Card,
  Chart,
  DataDisplay,
  Footer
};

interface UIComponentRendererProps {
  component: UIComponent;
  data?: Record<string, any>;
}

export const UIComponentRenderer = ({ 
  component, 
  data 
}: UIComponentRendererProps) => {
  const Component = componentMap[component.type];
  
  if (!Component) {
    console.warn(`Component type "${component.type}" not found`);
    return null;
  }

  const childrenWithData = component.children?.map(child => (
    <UIComponentRenderer 
    //   key={child.type} 
      component={child} 
      data={data} 
    />
  ));

  return (
    <Component {...component.props} data={data}>
      {childrenWithData}
    </Component>
  );
}; 