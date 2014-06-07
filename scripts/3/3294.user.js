// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MyScript", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Myscript
// @description   example script to alert on every page p tag
// @include       *
// @include       http://www.airdeccan.net/air/search_result.asp
// @include       http://airdeccan.net/air/search_result.asp

// ==/UserScript==


document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
   var classes = elem[i].className;
   if (myclass.test(classes)) retnode.push(elem[i]);
   }
return retnode;
};

var regExp = /<\/?[^>]+>/gi;

function ReplaceTags(xStr){
        xStr = xStr.replace(regExp,"");
        return xStr};



x=document.getElementsByClassName("fares");
y=ReplaceTags(x[0].innerHTML);
//var x=window.document.getElementsByTagName('P')[20].childNodes[0].nodeValue
alert(y)
z=parseFloat(y)
alert(z)
if(z=='500.00' || z=='1.00')
{
	alert('book now')
}
else
{
	loc = window.location.href
	window.location = loc
}