// CCTVDREAM emotion user script
// version 0.1 BETA!
// 2013-04-30
// Copyleft (c) 2013, Roger
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script for cctvdream fourm.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello CCTVDREAM", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello CCTVDREAM
// @namespace     http://weibo.com/u/2697828192
// @description   more emotion icon for cctvdream fourm
// @include       http://www.cctvdream.com.cn/bbs/*post*
// @
// ==/UserScript==
function insertText(str) {
	seditor_insertunit('fastpost', str);
}

function insemo(smilieid) {
	checkFocus();
		fastpost_textarea[0].innerHTML=('<img src="' + src + '" border="0" smilieid="' + smilieid + '" alt="" />', false);
}

	var div = document.createElement('div');
	document.getElementsByClassName('bn')[0].appendChild(div);

	var getentry = function(){
	var urls = '<input type="button" value="插入" onclick="insemo(550);"/> '
	div.innerHTML = urls;
}
window.addEventListener('load', getentry, false);
