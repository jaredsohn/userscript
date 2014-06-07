// Next Bus!
// version 0.1 BETA!
// 2007-08-13
// Copyright (c) 2007, Dan Crawford <dan_on_vacation@yahoo.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Next Bus", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Next Bus
// @namespace     http://kootenaygreen.ca
// @description   script to get the next bus times for a specific stop in Calgary
// @include       http://tripplanning.calgarytransit.com/*
// ==/UserScript==

// prompt user for bus stop number

if (!GM_getValue('stopnum')) {
  stopnum = prompt("Enter a Bus Stop #");
  GM_setValue('stopnum', stopnum);
} else {
  stopnum = GM_getValue('stopnum');
}

// set the stop num
document.getElementById('PublicNum').value = stopnum;

// set the date
var date = new Date();

var m = date.getMonth() + 1;
var d = date.getDate();

var month = new String( m );
var day = new String( d );

if (month.length == 1) {
  month = "0" + month;
} 

if (day.length == 1) {
  day = "0" + day;
}


var formated_date = new String(month + "-" + day + "-" + date.getFullYear());

document.getElementById('Date').value = formated_date;

// set the current time
var am = false;
var hours = date.getHours();
var mins  = date.getMinutes();

var minutes = new String( mins );

if (hours < 12) {
  am = true;
} else if (hours != 12) {
  am = false;
  hours = hours - 12
}

if (minutes.length == 1) {
  minutes = "0" + minutes;
}

var time = hours + ":" + minutes;

document.getElementById('FromTime').value= time;

// set am or pm
var meridiem = document.getElementsByName('FromMeridiem');

if (am) {
  meridiem[0].checked='checked';
} else {
  meridiem[1].checked='checked';
}

// submit the form
document.getElementsByName('NextBusFind')[0].submit();