const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  /* 
  wartość atrytutu _id jest nadawana automatycznie przez MongoDB, 
  a zatem powinna zawsze być poprawna. 
  Dlatego też możemy go w ogóle pominąć w schemacie
  */
  // _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true, minlength: 5, maxlength: 20 }
});

module.exports = mongoose.model('Department', departmentSchema);
