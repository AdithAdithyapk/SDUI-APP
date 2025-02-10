import { UISchema } from '../types/ui-schema';

export const getDashboardUI = (): UISchema => {
  return {
    metadata: {
      title: "School Management System",
      description: "Dashboard Overview"
    },
    layout: {
      type: "Layout",
      props: {
        header: {
          type: "Header",
          props: {
            logo: "/assets/logo.png",
            title: "School Management System",
            navigation: [
              { label: "Home", path: "/" },
              { label: "Settings", path: "/settings" }
            ],
            userMenu: true
          }
        },
        sidebar: {
          type: "Sidebar",
          props: {
            items: [
              { label: "Dashboard", path: "/", icon: "dashboard" },
              { label: "Students", path: "/students", icon: "students" },
              { label: "Teachers", path: "/teachers", icon: "teachers" }
            ]
          }
        },
        content: {
          type: "Grid",
          props: {
            columns: 3,
            spacing: 20
          },
          children: [
            {
              type: "Card",
              props: {
                title: "Attendance",
                content: {
                  type: "Chart",
                  props: {
                    chartType: "line",
                    data: "attendance_data"
                  }
                }
              }
            },
            {
              type: "Card",
              props: {
                title: "Results",
                content: {
                  type: "DataDisplay",
                  props: {
                    dataKey: "results_data"
                  }
                }
              }
            },
            {
              type: "Card",
              props: {
                title: "Notes",
                content: {
                  type: "DataDisplay",
                  props: {
                    dataKey: "notes_data"
                  }
                }
              }
            }
          ]
        },
        footer: {
          type: "Footer",
          props: {
            text: "Design and Copyrights by Phoenix Studios"
          }
        }
      }
    },
    data: {
      attendance_data: {
        // Your attendance chart data
      },
      results_data: {
        // Your results data
      },
      notes_data: {
        // Your notes data
      }
    }
  };
}; 