// ==UserScript==
// @name T-Mobile Log Out Confirm bypasser
// @description On log out, bypasses the annoying "Are you sure you want to log out?" message.
// @match https://my.t-mobile.com/*
// @include https://my.t-mobile.com/*
// ==/UserScript==

var a = document.getElementsByTagName("a");
var len = a.length;
for (var i = 0; i < len; i++) {
	var c = a[i].getAttribute("onclick");
	if (c != undefined && c.toString().indexOf("https://my.t-mobile.com/logout.aspx") != -1) {
		a[i].setAttribute("href", "https://my.t-mobile.com/logout.aspx");
		a[i].removeAttribute("onclick");
	}
}

/*
modified:
<a href="#" onclick="return TMobileConfirmLogout('https://my.t-mobile.com/logout.aspx');" onmouseout="javascript:window.status = ' '; return true;"><span>Log Out</span></a>
*/
