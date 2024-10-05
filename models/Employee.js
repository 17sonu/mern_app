const mongoose = require('mongoose');

const schema={
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   position: {
       type: String,
       required: true
   }
   };

module.exports = mongoose.model('employees', schema);
