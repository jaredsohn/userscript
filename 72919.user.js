// Auto-Login OGame
// Started 2009-11-25
// Author: Gazpachou - gazpachou (at) gmail (point) com
// License: GNU General Public License
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
// select "Auto-Login OGame", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Auto-Login OGame
// @description    Select universe and username on OGame automatically!
// @version        0.5
// @include        http://*.ogame.*/
// @include        http://*.ogame.*/?error=*
// @include        http://ogame.*/
// @include        http://ogame.*/?error=*
// @include        http://*.o-game.*/
// @include        http://*.o-game.*/?error=*
//
// ==/UserScript==


// CONFIG //
var universe = "uni35.ogame.org";     // Set here your universe (Domain server only)
var username = "bla";           // Set here your username
var password = "bla";           // Set here your password
var rememberPassword = true;			 // Set true or false if you want remember or not the password


// DON'T CHANGE ANYTHING UNDER THIS LINE //
document.getElementById("loginForm").setAttribute("action", "http://" + universe + "/game/reg/login2.php");
document.getElementById("uni_select_box").value = universe;
document.getElementById("inputform").value = username;
if (rememberPassword) {
	document.getElementById("passwort").value = password;
	document.getElementById("login_button").focus();
} else {
	document.getElementById("passwort").focus();
}
// DON'T CHANGE ANYTHING ABOVE THIS LINE //