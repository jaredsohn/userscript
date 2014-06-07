// ==UserScript==
// @name                iPredict: Global search box
// @namespace	        http://lineham.co.nz/userscripts/ipredict/searchbox
// @description	        Put a search box at the top of every page
// @version             1.0
// @match		https://ipredict.co.nz/*
// @match		https://www.ipredict.co.nz/*
// @match		http://play.ipredict.co.nz/*
// ==/UserScript==

var userStatus = document.evaluate(
	"//p[@id='welcome-line']",
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(userStatus) {
	userStatus.insertAdjacentHTML('beforeend',
' | <label for="search-keywords">Search </label>'+
'<form style="display:inline-block; margin: 0px; padding: 0px;" method="post" action="/app.php?do=browse">'+
'<input style="border: solid 1px #959494; background-color: #DEF; margin-top: 0px;" class="text-input" type="text" name="search_keywords">'+
'</form>');
}
