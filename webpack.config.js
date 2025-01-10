import path from 'path'; //working with actual paths from this webpack config file
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = 'production';

const config = {
    entry: './src/employees.jsx',
    output: {
        filename: 'employees.bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/, //find any jsx files 
                loader: 'babel-loader',
                /*options: {
                    presets: ['@babel/preset-react'],
                },*/
            },
        ],
    }
}   

//reading employees.jsx file, then would import the EmployeeAdd component.  Output file is employees.bundle.js (the package that will generate the final output file) within tnhe public folder.  
// no plugins, but saying use babel-loader to transpile the jsx files.  The babel-loader will use the @babel/preset


export default function(){
    if(isProduction) config.mode = 'production';
    else config.mode = 'development';
    return config
}

//now modify import statement at beginning of employees.jsx file (currently applies to EmployeeAdd.js but this file will no longer be created since webpack will transform EmployeeAdd.jsx to EmployeeAdd.js on the fly based on what's linked into it from employees.jsx)
//for dependency tree to be built correctly, need to import the pre-transformed file with the jsx extension (employees.jsx-- change EmployeeAdd.js import to EmployeeAdd.jsx)
//in terminal enter npx webpack
//executed webpack, and it created the employees.bundle.js file in the public folder
//to automate this process, npx webpack --watch
//now to update in package.json file, add a script to run webpack --watch