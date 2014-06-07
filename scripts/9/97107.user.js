// ==UserScript==
// @name           Facebook Error Page Killer
// @namespace      http://userscripts.org/scripts/show/97107
// @version        1.0.0
// @description    Automated method to return the user back to the previous page if a generic error page is seen.
// @include        http*://*.facebook.com/*
// @history        1.0.0 initial release
// ==/UserScript==

function goBack(){
	if (1 < window.history.length) {
		var last_url = window.history.previous;
		window.location.replace(last_url);
		return 0;
	}
	return -1;
}

// Functionally similar to the isEmpty() function in many languages
function isEmpty(data)
{
	if(data != null && data != "" && typeof(data) != "undefined") {
		return false;
	}
	return true;
}

// if possible return the page title other wise return "undefined"
function checkTitle(){
	var bRet = null;
	if(isEmpty(document.title) !== true) {
		bRet = document.title;
	}
	else if(isEmpty(window.title) !== true) {
		bRet = window.title;
	}
	else  {
		bRet = 'undefined';
	}
	return bRet;
}

function Init(){
	window.removeEventListener("load", Init, false);
	var pageTitle = checkTitle();
	if(pageTitle == 'Facebook | Error')
	{
		goBack();
	}
	return;
}

window.addEventListener("load", Init, false); //invoke