// ==UserScript==
// @name        Letsget - Clear ALL Storage Variables used by store.js
// @namespace   http://localhost.localdomain
// @description Clear Storage Variables
// @include     https://admin.letsget.net/Private/*
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://snappytomato.com/js/store-js/store.js
// @grant       metadata
// @version     3
// ==/UserScript==

// from userscripts.org

window.addEventListener("load", fnGetStarted, false);

function fnGetStarted() {

$("#uHeaderLinks_lblMessage").after('<div id="gmClearStore" style="width: 190px; position: fixed; left: 50%; top: 90px; margin: 0 0 0 110px;"><input id="gmbClearStore" type="button" value="Clear Storage" style="color: black; background-color:red;" /></div>');
		
$('#gmbClearStore').on('click', function(){ fnClearStore() });

}

function fnClearStore() {

	store.clear();
	alert('store cleared');
}
