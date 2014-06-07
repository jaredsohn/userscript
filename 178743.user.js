// ==UserScript==
// @name        DaysInnCydiaConnect
// @namespace   CydiaConnect
// @description Add the day of the week to the graph legend in Cydia Connect
// @include     https://cydia.saurik.com/connect/products/*/dygraph
// @version     1
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

"use strict";

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#stats").mousemove(function() {  

  var text = $(".dygraph-legend").text();

  // avoid adding the day multiple times
  if (!isNumber(text[0]))
		return;

  var array = text.split(" ");
  var dateText = array[0].replace(":", "");
  var dateObj = new Date(dateText);

	var weekday=new Array(7);
	weekday[0]="Sun";
	weekday[1]="Mon";
	weekday[2]="Tue";
	weekday[3]="Wed";
	weekday[4]="Thu";
	weekday[5]="Fri";
	weekday[6]="Sat";

  $(".dygraph-legend").text(weekday[dateObj.getDay()] + " " + $(".dygraph-legend").text());
});

