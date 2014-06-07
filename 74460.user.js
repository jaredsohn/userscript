// ==UserScript==
// @name           Market Force Secret Shopper Manager
// @namespace      marketforce__74460
// @description    Allows for sorting and restriction of secret shops available through marketforce.com 
// @version        0.4
// @require        http://usocheckup.dune.net/74460.js
// @include        https://www.marketforceshopper.com/XP2/DisplayPotentialShops.asp?*
// ==/UserScript==

// Initialize Variables
var debug = 0;
var shop_types = Array(); // Holds all the shop types

// This is the default xpath for the jobs table
var shop_table_xpath = "/html/body/table/tbody/tr[4]/td/table/tbody/tr[5]/td/table/tbody";

initialize_script();

document.getElementById('sort_submit').addEventListener('click', check_shops, true);
document.getElementById('show_all').addEventListener('click', show_all, true);

// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

// Set everything up
function initialize_script() {
     // Count the number of rows in the job table
     var shop_nodes = document.evaluate('count(' + shop_table_xpath + '/tr)', document, null, XPathResult.ANY_TYPE, null);
     var num_of_shops = shop_nodes.numberValue;

     if (num_of_shops == 0) {
	  shop_table_xpath = '/html/body/table/tbody/tr[4]/td/table/tbody/tr[6]/td/table/tbody';
	  shop_nodes = document.evaluate('count(' + shop_table_xpath + '/tr)', document, null, XPathResult.ANY_TYPE, null);
	  num_of_shops = shop_nodes.numberValue;
     }

     if (debug >= 1) GM_log("Total number of shops: " + num_of_shops);

     var shop_type_header = evaluate_xpath("//a[contains(@href, 'Sort=GenericShopType')]");
     shop_type_header.snapshotItem(0).removeAttribute('href');

     var workflow_node = evaluate_xpath(".//span[contains(.,'column header')]/../..");
     if (workflow_node.snapshotLength != 1) {
	  GM_log("There was an error trying to find the workflow_cell.");
	  return 0;
     }

     var workflow = workflow_node.snapshotItem(0);

     var type_count = 0;
     // Get all the distinct shop types and put them in array shop_types
     for (var i = 2; i < num_of_shops; i++) {
	  var row_node = evaluate_xpath(shop_table_xpath + '/tr[' + i + ']/td[1]');
	  var this_shop_type = row_node.snapshotItem(0).textContent;

	  if (isNaN(shop_types[this_shop_type])) {
	       if (debug >= 1) GM_log(i + ": New shop type detected -- " + this_shop_type);
	       shop_types[this_shop_type] = 1;
	  } else {
	       shop_types[this_shop_type] = shop_types[this_shop_type] + 1;
	       if (debug >= 2) GM_log(i + ": " + this_shop_type + "(" + shop_types[this_shop_type] + ")");
	  }
     }

     workflow.setAttribute("style", "padding: 5px");

     // Create a checkbox list for the shop types
     workflow.innerHTML = '<p><b>Shop Types</b></p>';
     workflow.innerHTML += '<p><select id="shop_type_select" size="4" multiple="true"></select></p>';

     var shop_select = document.getElementById('shop_type_select');

     for (i in shop_types) {
	  shop_select.innerHTML += '<option id="shop_type_' + i +
	       '" value="' + i + '"> ' + i + ' (' + shop_types[i] + ')</option>';
     }

     workflow.innerHTML += '<p><b>Search:</b><br /><input type="text" id="search_text" size="30"><br />';
     workflow.innerHTML += '<input type="button" id="sort_submit" value="Sort Shops" /></p>';
     workflow.innerHTML += '<input type="button" id="show_all" value="Show All Shops" />';
     return 0;
}


function show_all() {
     show_rows(shop_table_xpath + "/tr");
     var checkbox = evaluate_xpath(".//option[@id[contains(.,'shop_type')]]");

     for (i = 0; i < checkbox.snapshotLength; i++) {
	  checkbox.snapshotItem(i).selected = false;
     }

     document.getElementById('search_text').value = "";
}


// This function that gets activated when the submit button is clicked.
// Stores checked values into an array and then is passed to
// the next function
function check_shops() {
     var display_type = Array();

     for (i in shop_types) {
	  checkbox = document.getElementById('shop_type_' + i);
	  if (checkbox.selected == 1) {
	       display_type.push(i);
	  }
     }

     if (debug >= 1) GM_log('Passing to function display_shos()');
     display_shops(display_type);
}


function display_shops(display_type_array) {
     var contains_array = Array();
     var search_text = document.getElementById('search_text').value;

     for (i in display_type_array) {
	  contains_array.push("td[1]='" + display_type_array[i] + "'");
     }

     var search_clause = "(td[contains(.,'" + search_text + "')] or td[contains(.,'" + search_text.toUpperCase() + "')])";
     var show_rows_join = contains_array.join(" or ");

     hide_rows();

     if (search_text != "") {
	  if (contains_array.length >= 1) {
	       show_rows(shop_table_xpath + "/tr[(" + show_rows_join + ") and " + search_clause + "]");
	  } else {
	       show_rows(shop_table_xpath + "/tr[" + search_clause + "]");
	  }
     } else {
	  if (contains_array.length >= 1) {
	       show_rows(shop_table_xpath + "/tr[" + show_rows_join + "]")
	  }
     }
}

function show_rows(xpath_query) {
     var row_node = evaluate_xpath(xpath_query);

     for (i = 0; i < row_node.snapshotLength; i++) {
	 row_node.snapshotItem(i).removeAttribute('style');
     }

     return 0;
}


function hide_rows() {
     xpath_query = shop_table_xpath + "/tr";

     var row_node = evaluate_xpath(xpath_query);
     if (debug >= 1) GM_log("hide_rows returned: " + row_node.snapshotLength);

     for (i = 1; i < row_node.snapshotLength; i++) {
	 row_node.snapshotItem(i).setAttribute('style', 'display:none');
     }

     return 0
}


function evaluate_xpath(xpath_query) {
     if (debug >= 2) GM_log(xpath_query);
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     if (debug >= 1) GM_log('nodes returned: ' + nodes.snapshotLength);

     return nodes;
}