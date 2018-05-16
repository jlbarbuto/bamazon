## bamazon

# bamazonCustomer.js

* [`bamazonCustomer.js`](bamazonCustomer.js)

* Customers can use this application to view all items for sale and make a purchase. Customers are asked to enter an item id, provided in the list to products for sale, and also for the quantity they would like to buy:

![Customer Initialize](/images/cust_init.jpg)

* The app will use a connected database to check for the stock quantity of the product. If there is enough, the transaction will go through and user will be notified of their total cost. If there is not enough in stock, the user will be notified as well and taken back to the inital prompt.

![Customer Purchase](/images/cust_purch.jpg)
![Customer Sorry](/images/cust_sorry.jpg)

# bamazonManager.js

* [`bamazonManager.js`](bamazonManager.js)

* Managers can use this application to perform multiple actions:

![Manager Initialize](/images/mana_init.jpg)

* They can view all items in stock (plus their details):

![Manager View All](/images/mana_viewAll.jpg)

* They can view products with an inventory less than 5:

![Manager View Low Inventory](/images/mana_viewLow.jpg)

* The app will allow managers to add inventory to any item as well as add new products to the store:

![Manager Add Inventory](/images/mana_addInventory.jpg)
![Manager Add Product](/images/mana_addProd.jpg)

* Each action will update information in a connected database and be availble to view once the action has completed:

![Manager Update](/images/mana_updated.jpg)