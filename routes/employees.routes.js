const express = require('express');
const router = express.Router();
const Employee = require('../models/employees.model');
import EmployeesController from '../controllers/employees.controller';

router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getById);
router.post('/employees', EmployeesController.postNew);
router.put('/employees/:id', EmployeesController.change);
router.delete('/employees/:id', EmployeesController.delete);

module.exports = router;
