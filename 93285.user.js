// ==UserScript==
// @name           Threadless Order Totaller
// @description    Calculates total amount of money you've (*gulp*) spent on Threadless orders.
// @include        http://www.threadless.com/account/orders

/*	
	Script History
	
	v. 1.0.0 - 2010-12-21 Initial version
*/

// ==/UserScript==

(function() {

var orders, totalSpent = 0.0, shippedOrdersTable;

shippedOrdersTable = document.getElementsByClassName("page_head orange")[0].parentNode;
orders = shippedOrdersTable.getElementsByClassName("arrowitem");

for (var i = 0; i < orders.length && orders.length > 0; i++) {
	totalSpent += parseFloat(orders[i].innerHTML.split("$")[1]); // Tally up the order costs
}

// Note: Does not differentiate between orders paid for by gift certificate, credit card, etc.

var addition = document.createElement('text',{id:'spentInfo'});
addition.innerHTML = "<br><b>Total Spent</b>: $"+totalSpent.toFixed(2);
shippedOrdersTable.parentNode.insertBefore(addition,shippedOrdersTable.nextSibling); // Add this total info after the list of orders

})();