// ==UserScript==
// @name          Fastladder Direction Changer
// @namespace     http://code.ebrahim.ir/
// @description   Adds buttons in Fastladder to change direction of current feed
// @include       http://fastladder.com/reader/*
// @include       http://www.fastladder.com/reader/*
// @author        Ebrahim Mohammadi < ebrahim at mohammadi dot ir >
// @license       GPLv3
// @version       0.1
// ==/UserScript==
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------

window.fastladder_change_direction = function(dir)
{
	var classes = ['item_body', 'item_header', 'channel'];
	for (var i = 0; i < classes.length; ++i)
	{
		var allDivs = document.evaluate("//div[@class='" + classes[i] + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var ii = 0; ii < allDivs.snapshotLength; ++ii)
			allDivs.snapshotItem(ii).style.direction = dir;
	}
}

var menu = document.getElementById('menu_button');
var rtl = document.createElement('li');
var rtl_img = document.createElement('img');
rtl_img.border = 0;
rtl_img.src = 'data:image/gif,GIF89a%12%00%12%00%F2%00%00333fff3f%CCff%CCff%FFf%99%FF%00%00%00%00%00%00!%F9%04%01%00%00%06%00%2C%00%00%00%00%12%00%12%00%00%032h%BA%DC%FE0%CA9A%B0%14%60%D0%C8%B3%1C%B7%10%C3%A7%19%C1(x%CFe%88dQB%A9h%90%EC%F72d%C4%A5%3C%DF%8E%A2%A8%11%8F%C8%A4%F2%91%00%00%3B';
rtl_img.addEventListener('click', function() { fastladder_change_direction('rtl'); }, false);
rtl.appendChild(rtl_img);

menu.parentNode.insertBefore(rtl, menu.nextSibling);

var ltr = document.createElement('li');
var ltr_img = document.createElement('img');
ltr_img.border = 0;
ltr_img.src = 'data:image/gif,GIF89a%12%00%12%00%F2%00%00333fff3f%CCff%CCff%FFf%99%FF%00%00%00%00%00%00!%F9%04%01%00%00%06%00%2C%00%00%00%00%12%00%12%00%00%033h%BA%DC%FE0%CAI%1B%08%F7%09%062%80%C5%B0%5C%DF%F7%0C%C4ft_%00%11C%A8%60%2B%24%C0%8Ck%3A2W%9F%8EVEQ%1A%1At%C6%A4r)I%00%00%3B';
ltr_img.addEventListener('click', function() { fastladder_change_direction('ltr'); }, false);
ltr.appendChild(ltr_img);

menu.parentNode.insertBefore(ltr, menu.nextSibling);
