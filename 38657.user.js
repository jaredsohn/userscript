// ==UserScript==
// @name          HWM_NewLot_desc
// @description   HWM_NewLot_desc
// @include       http://www.heroeswm.ru/auction_new_lot.php
// ==/UserScript==


//alert("HWM_NewLot_desc");

var my_form = document.forms[0];
var sel_item = my_form[0];

//alert("sel_item.inner = "+sel_item.innerHTML);

var items_arr = sel_item.innerHTML.split("<option");
	
items_arr.reverse();
items_arr.pop();
var new_sel = "<option " + items_arr.join("<option");
	//alert("new_sel = "+new_sel);

sel_item.innerHTML = new_sel;



//


