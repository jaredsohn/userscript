// ==UserScript==
// @name        Assets Functions
// @namespace   mgAssetsFunction
// @include     http://*.marketglory.com/*
// @require		http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

unsafeWindow.setCookie = function(c_name, value, exdays, c_path) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" + "; path =" + c_path : "; expires =" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

unsafeWindow.getCookie = function(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");

	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);

		if (c_end == -1) {
			c_end = c_value.length;
		}

		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

unsafeWindow.checkCookie = function(c_name) {

	var name = getCookie(c_name);

	if (name != null && name != "") {
		return true;
	} else {
		return false;
	}

}

unsafeWindow.deleteCookie = function(c_name) {
	document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
}


/* MY FUNCTION */

/* START BOT'S
================================================================================== */
unsafeWindow.info_default = function() {
	$('#infoIDR b').text(checkCookie('FightLog') ? getCookie('IdrLog') : $('.ms_x .right b').text());
	$('#infoFIGHT b').text(checkCookie('FightLog') ? getCookie('FightLog') : '..');
	$('#infoWORK b').text(checkCookie('WorkLog') ? getCookie('WorkLog') : '..');
}

unsafeWindow.bot_start = function() {
	if (checkCookie('IdrLog')) {
		setCookie('FightLog', 0);
		setCookie('WorkLog', 0);
		window.location.assign('http://www.marketglory.com/account/fight');
	} else {
		var user_idr = $('.ms_x .right b').text();
		setCookie('IdrLog', user_idr);
		bot_start();
	}
}

unsafeWindow.clear_cookie = function(cookieList) {
	for(i = 1; i <= cookieList.length; i++) {
		deleteCookie(cookieList[i-1]);
	}
	window.location.assign('http://www.marketglory.com/account');
}