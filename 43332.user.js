// -----------------------------------------------------------------
// 
// This is a Greasemonkey user script.
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
// 
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name          Auto Login for Auto Complete
// @namespace     http://www.samliew.com
// @description   Auto Login script by samliew
// Last updated:  01 Mar 2009
// 
// What this script does:
// - Auto Submits form when there is input in username and password field on page load (when auto complete is on)
// 
// @include       *
// 
// ==/UserScript==

var x=false, y=false;
var f=document.forms[0];
var n=f.getElementsByTagName("input");

// Check if form has a text field and a password field, and whether both have pre-filled values from auto complete
for(i=0;i<n.length;i++) {
   if(n[i].type=="text"&&n[i].value.toLowerCase()!="username"&&n[i].value.length!=0) x=true;
   if(n[i].type=="password"&&n[i].value.length!=0) y=true;
}

// If a text field and password field exists and both have value, submit form
if(x==true&&y==true) { f.submit(); }

// End