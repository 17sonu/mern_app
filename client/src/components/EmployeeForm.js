import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ refreshEmployees, editEmployee, setEditEmployee }) => {
   const [employee, setEmployee] = useState({ name: '', email: '', position: '' });

   // Populate form when editing
   useEffect(() => {
      if (editEmployee) {
         setEmployee(editEmployee);
      }
   }, [editEmployee]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (editEmployee) {
         // If we're editing, send PUT request
         await axios.put(`http://localhost:5000/api/employees/${editEmployee._id}`, employee);
         setEditEmployee(null); // Reset form state after updating
      } else {
         // If we're adding a new employee, send POST request
         await axios.post('http://localhost:5000/api/employees', employee);
      }

      setEmployee({ name: '', email: '', position: '' }); // Reset form fields
      refreshEmployees(); // Refresh the employee list
   };

   return (
      <form onSubmit={handleSubmit}>
         <input type="text" value={employee.name} placeholder="Name" onChange={e => setEmployee({ ...employee, name: e.target.value })} />
         <input type="email" value={employee.email} placeholder="Email" onChange={e => setEmployee({ ...employee, email: e.target.value })} />
         <input type="text" value={employee.position} placeholder="Position" onChange={e => setEmployee({ ...employee, position: e.target.value })} />
         <button type="submit">{editEmployee ? 'Update Employee' : 'Add Employee'}</button>
      </form>
   );
};

export default EmployeeForm;
