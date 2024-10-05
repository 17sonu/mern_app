const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT;
const mongo_url = process.env.MONGO_CONN;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongo_url)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

   const Employee = require('./models/Employee');

   // POST - Add a new employee
   app.post('/api/employees', async (req, res) => {
      const { name, email, position } = req.body;
      const newEmployee = new Employee({ name, email, position });
      await newEmployee.save();
      res.json(newEmployee);
   });
   
   // GET - Fetch all employees
   app.get('/api/employees', async (req, res) => {
      const employees = await Employee.find();
      res.json(employees);
   });
   
   // PUT - Update an employee by ID
   app.put('/api/employees/:id', async (req, res) => {
      const { id } = req.params;
      const { name, email, position } = req.body;
      const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, position }, { new: true });
      res.json(updatedEmployee);
   });
   
   // DELETE - Delete an employee by ID
   app.delete('/api/employees/:id', async (req, res) => {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.json({ message: 'Employee deleted' });
   });


// Start server
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});