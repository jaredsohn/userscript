// ==UserScript==
// @name           DA Agegate Bypass
// @namespace      DA_Realms
// @description    It gets rid of the agegate page on Bioware's Dragon Age pages.
// @include        http://dragonage.bioware.com/*
// @include        http://daforums.bioware.com/agegate.html*
// ==/UserScript==

function setCookie() {
	document.cookie="da_agegate=4/1/1980; expires=" + new Date((new Date).setMonth((new Date).getMonth() + 1)).toGMTString() + "; domain=bioware.com"
}

if (document.cookie.indexOf("da_agegate") == -1) {
	if (location.href.split("/")[3].indexOf("agegate.html") == 0) {
		setCookie()
		location.replace("http://" + unescape(location.hostname + location.search.split(/[?&]ref=/)[1].split("&")[0]))
	} else {
		setCookie()
		location.reload(false)
	}
}