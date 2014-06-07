// ==UserScript==
// @name           zpovednice otevri diskuzi kde jsem byl/a naposled
// @namespace      deamonicky script
// @description    zpovednice otevre diskuzi kde jsi byl/a naposled
// @include        http://zpovednice.cz/detail.php?statusik=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//1. scrollto
//2. gettime, getpos
//3. set,get 
//alert(Date());//GM_setValue("foo", "bar");

/* 
 * 
var vals = [];
for each (var val in GM_listValues()) {
  vals.push(GM_getValue(val));
}
 */

var store_url = location.href;
var INVALID = "???";
var delete_after = 1 /*minutes*/ * 60 /*seconds*/ * 1000/*miliseconds*/; // [miliseconds]

//time + separator + pos);

// http://wiki.greasespot.net/Serialization_Helpers
function  x_to_string(x) {
	return uneval(x);
}
function string_to_x(s) {
	return eval(s);
}

function date_difference_larget_than_in_milliseconds (date1, date2, msecs) {
  return date1.getTime() - date2.getTime() > msecs;
}
function no_more_than_miliseconds_elapsed_from_date_which_is_in_date(date, msecs) {
	return Date.now() - (new Date(date)).getTime() > msecs;
}
// original idea:
// http://wiki.greasespot.net/GM_listValues
// and assigining id
// would not work for a -> b to store date AND position
// therefore b must be of composed type
//    idea:    time # position
//    actually it is possible to store data structures 
// just finding out it is invalid would suffice

for each (var i in GM_listValues()) {
	var x = string_to_x(GM_getValue(i));	
	// DEBUG alert(i + "@" + x.time);
	if (no_more_than_miliseconds_elapsed_from_date_which_is_in_date(x.time, delete_after))
		GM_deleteValue(i);		
}

/* not working
 * 
container.animate({
    scrollTop: scrollTo.offset().top - container.offset().top
});​

 */

//alert(store_item);
//alert($("[class=sectlheader]:gt("+(store_item-2)+")").position().top);
/*$('html, body').scrollTop(9000);*/

var store_item = 0; $("[class=sectlheader]").each(function () { store_item=store_item+1;}); // pocet prvku
if (INVALID == GM_getValue( store_url, INVALID )) {
	var x = {time: Date(), position: store_item}; 
	GM_setValue( store_url, x_to_string(x)); 
	// set only
	// DEBUG alert("set value");
} else {
	var x = string_to_x(GM_getValue(i));
	var pos = $("[class=sectlheader]:gt("+(x.position-3)+")").position().top;
	$('html, body').scrollTop(pos);

	//var store_item = 0; $("[class=sectlheader]").each(function () { store_item=store_item+1;}); // pocet prvku
	// DEBUG alert(i);
	x.position = store_item;
	GM_setValue( store_url, x_to_string(x));
	// posun se na pozici
	
	// ubehlo prilis casu

	// alert(string_to_x(GM_getValue(url)).position+"#"+string_to_x(GM_getValue(url)).time);
	// OK

	//var x = string_to_x(GM_getValue(url)); // hash, { time: Date(), position: integer}

	//alert(x.position+" # "+x.time);
	// OK

	// NOT WORKING:
	//	// http://www.w3schools.com/js/js_obj_date.asp
	//	//new Date(year, month, day, hours, minutes, seconds, milliseconds)
	//	var delete_after = (0, 0,0, /*days*/ 0,2, /*minutes*/ 0,0 /*miliseconds*/);
	//	if (Date() - x.time > delete_after) {
	// WORKING< but UGLY:L
	
	// var now = new Date();
	// var now_t = now.getTime();
	// var then = new Date(x.time);
	// var then_t = then.getTime();//).getTime();


	// hoist it up :)
/*		
	if (date_difference_larget_than_in_milliseconds(new Date(), new Date(x.time), delete_after)) {
		if (no_more_than_miliseconds_elapsed_from_date_which_is_in_string(x.time, delete_after))
			alert("works");
		alert("deleted");//alert("foo");
		GM_deleteValue(url);	
	} else {
		if (! no_more_than_miliseconds_elapsed_from_date_which_is_in_string(x.time, delete_after))
			alert("works");
	}
	//alert("x");
*/
	// http://wiki.greasespot.net/GM_deleteValue
}