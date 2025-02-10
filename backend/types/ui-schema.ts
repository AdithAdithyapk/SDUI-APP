export interface UIComponent {
  type: string;
  props: Record<string, any>;
  children?: UIComponent[];
}

export interface UISchema {
  layout: UIComponent;
  data: Record<string, any>;
  metadata: {
    title: string;
    description?: string;
  };
} 