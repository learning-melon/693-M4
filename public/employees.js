class EmployeeFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the employee filter.");
  }
}
function EmployeeTable(props) {
  const employeeRows = props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
    key: employee._id,
    employee: employee
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Extension"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Date Hired"), /*#__PURE__*/React.createElement("th", null, "Currently Employed?"))), /*#__PURE__*/React.createElement("tbody", null, employeeRows));
}
function EmployeeRow(props) {
  const employee = props.employee;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, employee.name), /*#__PURE__*/React.createElement("td", null, employee.extension), /*#__PURE__*/React.createElement("td", null, employee.email), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.dateHired.toDateString()), /*#__PURE__*/React.createElement("td", null, employee.currentlyEmployed ? 'Yes' : 'No'));
}
class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      name: form.name.value,
      extension: form.ext.value,
      email: form.email.value,
      title: form.title.value
      /*no longer needed, as default values already set in the models/Employees.js
      dateHired: new Date(),
      isEmployed: true,*/
    };
    this.props.createEmployee(employee);
    form.name.value = '';
    form.ext.value = '';
    form.email.value = '';
    form.title.value = '';
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeAdd",
      onSubmit: this.handleSubmit
    }, "Name: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name"
    }), /*#__PURE__*/React.createElement("br", null), "Extension: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "ext",
      maxLength: 4
    }), /*#__PURE__*/React.createElement("br", null), "Email: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "email"
    }), /*#__PURE__*/React.createElement("br", null), "Title: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", null, "Add"));
  }
}
class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.createEmployee = this.createEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    //load data from db
    fetch('/api/employees').then(response => response.json()).then(data => {
      console.log('Total count of employees:', data.count);
      data.employees.forEach(employee => {
        employee.dateHired = new Date(employee.dateHired);
      });
      this.setState({
        employees: data.employees
      });
    }).catch(err => console.log(err));
  }
  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      //since post, will call createEmployee from routes
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    }).then(response => response.json()).then(newEmployee => {
      //take new employee that was added and add to the list
      newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired);
      const newEmployees = this.state.employees.concat(newEmployee.employee);
      this.setState({
        employees: newEmployees
      });
      console.log('Total count of employees:', newEmployees.length);
    }).catch(err => console.log(err));
    this.setState({
      employees: newEmployeeList
    });
  }
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Employee Management Application"), /*#__PURE__*/React.createElement(EmployeeFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeAdd, {
      createEmployee: this.createEmployee
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(EmployeeList, null)), document.getElementById('content'));