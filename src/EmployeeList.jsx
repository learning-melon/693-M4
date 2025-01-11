import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'

function EmployeeRow(props) {
    function onDeleteClick() {
        props.deleteEmployee(props.employee._id)
    }

    return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
            <td><button onClick={onDeleteClick}>DELETE</button></td>
        </tr>
    )
}

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee => 
        <EmployeeRow 
        key={employee._id} 
        employee={employee}
        deleteEmployee={props.deleteEmployee}
        />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employeeRows}
            </tbody>
        </table>
    )
}

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        //load data from db
        fetch('/api/employees')
            .then(response => response.json())
            .then(data => {
                console.log('Total count of employees:', data.count)
                data.employees.forEach(employee => {
                    employee.dateHired = new Date(employee.dateHired)
                })
                this.setState({ employees: data.employees }) //this will trigger render, as a change in state is detected
            })
            .catch(err => console.log(err))
    }
    createEmployee(employee) {
        fetch('/api/employees', { 
            method: 'POST', //since post, will call createEmployee from routes
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        })
            .then(response => response.json())
            .then(newEmployee => { //take new employee that was added and add to the list
                newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
                const newEmployees = this.state.employees.concat(newEmployee.employee)
                this.setState({ employees: newEmployees })
                console.log('Total count of employees:', newEmployees.length)
            })
            .catch(err => console.log(err))
        this.setState({ employees: newEmployeeList })
    }
    deleteEmployee(id){
        fetch(`/api/employees/${id}`, { method: 'DELETE' })
            .then(response => {
                if(!response.ok) console.log('Failed to delete employee.')
                else{
                    this.loadData()
                }
            })  
    }
    render() {
        return (
            <React.Fragment>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <hr />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
                <hr /> 
                <EmployeeAdd createEmployee={this.createEmployee} />
            </React.Fragment>
        )
    }
}