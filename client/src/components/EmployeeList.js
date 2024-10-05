import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ setEditEmployee }) => {
   const [employees, setEmployees] = useState([]);

   const fetchEmployees = async () => {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data);
   };

   const handleDelete = async (id) => {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees(); // Refresh the list after deletion
   };

   useEffect(() => {
      fetchEmployees(); // Fetch employees when the component loads
   }, []);

   return (
      <div>
         <h2>Employee List</h2>
         <ul>
            {employees.map(emp => (
               <li key={emp._id}>
                  {emp.name} ({emp.position}) - {emp.email}
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  <button onClick={() => setEditEmployee(emp)}>Edit</button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default EmployeeList;

