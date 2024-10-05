import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import axios from 'axios';

const App = () => {
   const [employees, setEmployees] = useState([]);
   const [editEmployee, setEditEmployee] = useState(null);

   // Function to fetch employees from the backend
   const fetchEmployees = async () => {
      try {
         const res = await axios.get('http://localhost:5000/api/employees');
         setEmployees(res.data);
      } catch (error) {
         console.error("Error fetching employees:", error);
      }
   };

   // Use useEffect to fetch employees when the component mounts
   useEffect(() => {
      fetchEmployees();
   }, []);

   return (
      <div>
         <h1>Employee Management System</h1>
         <EmployeeForm
            refreshEmployees={fetchEmployees} 
            editEmployee={editEmployee} 
            setEditEmployee={setEditEmployee} 
         />
         <EmployeeList employees={employees} setEditEmployee={setEditEmployee} />
      </div>
   );
};

export default App;
