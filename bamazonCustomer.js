//require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//establish connection with database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    initializeApp();
});

//function that shows all items avalible for purchase
function initializeApp(){
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res){
        for (var i=0; i<res.length; i++){
            console.log(`Item ID: ${res[i].item_id} || Product Name: ${res[i].product_name} || Price: ${res[i].price}`);
        }
        purchase();
    });       
}

//asks the user if they would like to make a purchase and handles their choice accordingly
function purchase(){
    inquirer.prompt([
        {
            name: "buyAction",
            type: "confirm",
            message: "Would you like to make a purchase?"
        }
    ]).then(function(answer){
        if (answer.buyAction){
            runAction();
        }else{
            console.log("Goodbye");
            process.exit();
        }
    });
}

//asks the user which item they would like to buy and how much
function runAction(){
    inquirer.prompt([
    {
        name: "toBuy",
        type: "input",
        message: "Enter item id of the product you would like to buy.",
    },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }
    ]).then(function(answer){
        var query = "SELECT * FROM products";
        connection.query(query, function(err, res){
            for (var i=0; i<res.length; i++){
                if (res[i].item_id == answer.toBuy){
                    var stock = res[i].stock_quantity;
                    var requested = parseInt(answer.quantity);
                    //If statement checks to see if there is enough product in stock to fill order
                    if (stock < requested){
                        //to little stock will notify user and bring them back to the start
                        console.log("Sorry, we do not have enough items in stock.");
                        runAction();
                    }else{
                        //enough stock triggers the updateStock function
                        var newStock = stock - requested;
                        var totCost = (requested * res[i].price);
                        updateStock(newStock, res[i].item_id, totCost);
                    }
                }
            }
        });
    });
}

//if user makes a purchase, stock will be updated in the connected database table
function updateStock(initialStock, givenItem, totalCost){
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: initialStock
            },
            {
                item_id: givenItem
            }
        ],
        //after function updates the table, app notifies use their order is complete
        function(err, res){
            console.log("Your order is on the way! Your total is $" + totalCost + ".")
            initializeApp();
        }
    );
}