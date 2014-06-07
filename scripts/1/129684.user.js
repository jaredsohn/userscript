// ==UserScript==
// @name traders.lt blank space fix
// @namespace http://jackunas.lt
// @description Removed blank space after adblock+ blocked adds
// @include http://*.traders.lt/*
// ==/UserScript==

// remove top ad blank space | request by la^
var container		= document.getElementById('container');
var empty_div		= container.children[8];
container.removeChild(empty_div);

// remove right table column leftover(s) | request by la^
// xpath - /html/body/table/tbody/tr/td[2]
/*
var all_tables		= document.getElementsByTagName('table');
var main_table		= all_tables[0];
var table_element	= main_table.children[0].children[0];
var bad_table_child = table_element.children[1];
*/

// remove 2nd cell that had ads
/*
table_element.removeChild(bad_table_child);
*/

// reduce width of main table to match the width of the single cell now..
/*
main_table.style.width = '840px';
*/