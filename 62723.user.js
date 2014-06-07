// ==UserScript==
// @name           TC City Highlight
// @description    City link becomes red if new hour begins and you not visited in the City
// @namespace      http://userscripts.org/users/65879
// @include        http://www.torncity.com/*
// @include        http://torncity.com/*
// @include        http://www.torn.com/*
// @include        http://torn.com/*
// ==/UserScript==

var cookie_name = 'tc_city_highlight';

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {c_end = document.cookie.length;};
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function setCookie(c_name, value, expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function checkCookie() {
	cookie_value = getCookie(cookie_name);
	var current_date = new Date();
	current_date.setDate(current_date.getDate());
	var date_str = format_date(current_date);
	
	highlight = 0;
	if (cookie_value != null && cookie_value != "") {
		if (cookie_value != date_str) {highlight = 1;};
	} else {
		highlight = 1;
	}
	
	location_str = document.location.toString();
	if (location_str.match(/city.php/) !== null) {
		setCookie(cookie_name, date_str, 1);
		highlight = 0;
	}

	if(highlight == 1) {
		var allLinks, thisLink;
		allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allLinks.snapshotLength; i++) {
			thisLink = allLinks.snapshotItem(i);
			hrefas = thisLink.href;
			if (hrefas.match("/city.php") && thisLink.target == "_self") {
				thisLink.setAttribute("style", "color: red");
			}
		}
	}
}

function format_date(date_val){
	new_date = date_val.getFullYear() + '-' + (date_val.getMonth() + 1) + '-' + date_val.getDate() + ' ' + (date_val.getHours());
	return new_date;
}

checkCookie();