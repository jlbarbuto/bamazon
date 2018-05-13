var sql = require("mysql");
var inquirer = require("inquirer");

//establish connection with database
var connection = mysql.createConnection({
    host: "localhost",
    por: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;

});

function chooseAction(){
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]            
        }
    ]);
}

function actionViewAll(){
    
}

function actionViewLow(){
    
}

function actionAddInventory(){
    
}

function actionAddProduct(){
    
}