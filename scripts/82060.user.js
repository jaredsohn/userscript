// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Stop The Presses!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Centsports MAXBET
// @description   This will choose the maximum allowed bonus automatically
// @include       http://www.centsports.com/choose_bonus/*
// ==/UserScript==



function chooseMaxBonus() {

var tempBonus, bonus;
var l, c;
bonus = document.getElementsByTagName('strong');
   tempBonus = bonus[0];
	if(tempBonus.innerHTML == "(TAKE IT! That's the max you can get!)") {
	var tempPathname = window.location.pathname;
	tempPathname = tempPathname.replace("choose_bonus", "accept_bonus")
	var newURL = window.location.protocol + "//" + window.location.host + tempPathname ;
	window.location=newURL;
	
}
	else window.location.reload();

 }

 chooseMaxBonus();