// ==UserScript==
// @name        Gmail right hand pane Removal
// @namespace   http://userscripts.org/users/474201
// @description Removes right hand pane 
// @include     https://mail.google.com/mail/*
// @include     http://mail.google.com/mail/*
// @version     3.2
// ==/UserScript==

function check () {
	// vertical split
	hideXPath("/html/body/div/div[2]/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div[3]/div/table/tr/td[2]");
	// horizontal split
	hideXPath("/html/body/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div/table/tr/td[2]");
	// no split
	hideXPath("/html/body/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/table/tr/td[3]");
}

function hideXPath(xpath) {
	var sp = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	var h = sp.iterateNext();
	while(h) {
		h.style.display = 'none';
		h = sp.iterateNext();
	}
}

var spcheck = setInterval(check, 500);

