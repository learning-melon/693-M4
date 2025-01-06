import Employee from '../models/Employees.js'

const getAllEmployees = async (req,res) => {
    try{
        const employees = await Employee.find({})
       
        res.status(200).json({employees, count: employees.length})
        //res.status(200).json({employees})
        //res.send('Get all employees')
    }catch(err){
        res.status(500).json({msg:err})
    }
    
}

const getEmployee = async (req,res) => {
    try{
        let {id:employeeId} = req.params
        const employee = await Employee.findOne({_id:employeeId})
      
        if(!employee){
            return res.status(404).json({msg:`No employee with ID ${employeeId} found`})
        }
       
        res.status(200).json({employee})
        //res.send('Get single employee')
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const createEmployee = async (req,res) => {
    try{
        const employee = await Employee.create(req.body)
        res.status(201).json({employee})
        //res.status(200).json({msg: 'Employee added successfully'})
        //res.send('Create single employee')
    }catch(err){
        res.status(500).json({msg: err})
    }
   
}

const updateEmployee = async (req,res) => {
    try{
       let {id:employeeId}  = req.params
       const employee = await Employee.findOneAndUpdate({_id: employeeId},req.body,{
        new:true,           //returns new document as an object back into postman
        runValidators: true //run validators within schema
       })
       if(!employee){
        return res.status(404).json({msg:`No employee with ID ${employeeId} found`})
       }
       res.status(200).json({msg: 'Employee updated successfully'})
        //res.send('update single employee')
    }catch(err){
        res.status(500).json({msg: err})
    }
   
}

const deleteEmployee = async (req,res) => {
    try{
        let {id:employeeId} = req.params
        const employee = await Employee.findOneAndDelete({_id:employeeId})
      
        if(!employee){
            return res.status(404).json({msg:`No employee with ID ${employeeId} found`})
        }
       
        res.status(200).json({msg: 'Employee successfully deleted'})
        //res.send('Delete an employee')
    }catch(err){
        res.status(500).json({msg:err})
    }
}

//exporting individually since not in a class
export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}