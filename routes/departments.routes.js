const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');
import { DepartmentController } from '../controllers/departments.controller';

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.postNew);
router.put('/departments/:id', DepartmentController.change);
router.delete('/departments/:id', DepartmentController.delete);

module.exports = router;
