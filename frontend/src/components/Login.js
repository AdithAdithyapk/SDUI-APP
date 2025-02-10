import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [uiSchema, setUiSchema] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch UI schema from backend
  useEffect(() => {
    axios.get("http://localhost:4000/login-ui")
      .then(response => setUiSchema(response.data))
      .catch(error => console.error("Error fetching UI schema:", error));
  }, []);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle button actions dynamically
  const handleAction = async (action, method) => {
    if (method === "POST") {
      try {
        const response = await axios.post(`http://localhost:4000${action}`, formData);
        alert(response.data.message);
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
        }
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
      }
    } else {
      window.location.href = action; // Redirect for GET requests
    }
  };

  return (
    <div style={uiSchema?.styles?.container}>
      <div style={uiSchema?.styles?.box}>
        {uiSchema?.components.map((component, index) => {
          if (component.type === "text") 
            return <h2 key={index} style={component.style}>{component.content}</h2>;

          if (component.type === "input") 
            return (
              <input 
                key={index} 
                type={component.inputType} 
                name={component.name} 
                placeholder={component.placeholder} 
                onChange={handleChange} 
                style={uiSchema?.styles?.input} 
              />
            );

          if (component.type === "button") 
            return (
              <button 
                key={index} 
                onClick={() => handleAction(component.action, component.method)} 
                style={uiSchema?.styles?.button}
              >
                {component.label}
              </button>
            );

          if (component.type === "link") 
            return <a key={index} href={component.action} style={uiSchema?.styles?.link}>{component.label}</a>;

          if (component.type === "toggle" && component.feature === "showSignup") 
            return component.components.map((subComp, i) => (
              <button 
                key={i} 
                onClick={() => handleAction(subComp.action, subComp.method)} 
                style={uiSchema?.styles?.button}
              >
                {subComp.label}
              </button>
            ));

          return null;
        })}
      </div>
    </div>
  );
};

export default Login;