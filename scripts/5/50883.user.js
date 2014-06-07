// bing porn mode (german)
// 2009-06-05
// Copyright (c) 2009, Josef Schneider
// Released under the GNU General Public License v3
// http://www.gnu.org/copyleft/gpl.html
//
//
// The code for the cookie management was taken from quirksmode.org
// http://www.quirksmode.org/js/cookies.html
//
//
// ==UserScript==
// @name           bing porn mode
// @namespace      http://userscripts.org/users/29718
// @description    Disables the filter on bing.com
// @include       http://*.bing.com/*
// @include       http://bing.com/*
// ==/UserScript==


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function replaceSetting(cookiename,setting,value) {
	var newcookie="";
	var found=false;
	var sett=readCookie(cookiename)
	if (sett != null && sett.length>0) {
		sett=sett.split("&");
		for (var i = 0; i < sett.length; ++i) {
			if (i!=0)
				newcookie+="&";
			var thissetting=sett[i].split("=");
			if (thissetting[0].toUpperCase()==setting.toUpperCase()){
				newcookie+=thissetting[0];
				newcookie+="=";
				newcookie+=value;
				found = true;
			} else {
				for(var j= 0; j< thissetting.length; ++j)  {
					if (j!=0)
						newcookie+="=";
					newcookie+=thissetting[j];
				}
			}
		}
		if (!found) {
			if (newcookie.length>0)
				newcookie+="&";
			newcookie+=setting + "=" + value;
		}
	} else
		newcookie=setting + "=" + value;
	document.cookie = cookiename+"="+newcookie+"; domain=.bing.com; path=/";
	return newcookie;
}

replaceSetting("SRCHHPGUSR","ADLT","OFF");
replaceSetting("_FS","mkt","de-AT");

