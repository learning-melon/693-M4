import express from 'express'
import {getAllEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee} from '../controllers/employees.js'
const router = express.Router()

router.route('/api/employees')
    .get(getAllEmployees)        //get all employees
    .post(createEmployee)       //add employee

// router.route('/:id')
//     .get(getEmployee)     //get single employee
//     .patch(updateEmployee)   //update single employee
//     .delete(deleteEmployee)  //deleting single employee

export default router