var mysql = require("mysql");
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
    chooseAction();
    // actionViewAll();
});

function chooseAction(){
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale", 
                "View Low Inventory", 
                "Add to Inventory", 
                "Add New Product", 
                "exit"
            ]            
    }).then(function(answer){
        switch(answer.action){
            case "View Products for Sale":
                actionViewAll();
                break;
            case "View Low Inventory":
                actionViewLow();
                break;
            case "Add to Inventory":
                actionAddInventory();
                break;
            case "Add New Product":
                actionAddProduct();
                break;
            case "exit":
                console.log("Goodbye");
                process.exit();
        }
    });
}

function actionViewAll(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        for (var i=0; i<res.length; i++){
            console.log(`Item ID: ${res[i].item_id} || Product Name: ${res[i].product_name} || Price: ${res[i].price} || Quantity: ${res[i].stock_quantity}`)
        }
        chooseAction()
    });
}

function actionViewLow(){
    var query = "SELECT * FROM products WHERE stock_quantity <= 5";
    connection.query(query, function(err, res){
        for (var i=0; i<res.length; i++){
            console.log(`Item ID: ${res[i].item_id} || Product Name: ${res[i].product_name} || Price: ${res[i].price} || Quantity: ${res[i].stock_quantity}`)
        }
        chooseAction();
    });
}

function actionAddInventory(){
    inquirer.prompt([
        {
            name: "prodID",
            type: "input",
            message: "Enter item ID for product to be added."
        },
        {
            name: "qty",
            type: "input",
            message: "Enter quantity to be added."
        }
    ]).then(function(answer){
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: answer.qty
                },
                {
                    item_id: answer.prodID
                }
            ],
            function(err, res){
                console.log(`${answer.qty} added to inventory.`);
                chooseAction();
            }
        );
    });
}

function actionAddProduct(){
    inquirer.prompt([
        {
            name: "prodName",
            type: "input",
            message: "Enter product name."
        },
        {
            name: "departmentName",
            type: "input",
            message: "Enter department name."
        },
        {
            name: "price",
            type: "input",
            message: "Enter price."
        },
        {
            name: "qty",
            type: "input",
            message: "Enter quantity."
        }
    ]).then(function(answer){
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.prodName,
                department_name: answer.departmentName,
                price: answer.price,
                stock_quantity: answer.qty
            },
            function(err, res){
                console.log(`New product ${answer.prodName} was added to the ${answer.departmentName} department.`);
                chooseAction();
            }
        );
    });
}