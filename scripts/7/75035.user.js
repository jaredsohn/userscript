// ==UserScript==
// @name           Hit Enter For Login
// @namespace      www.webmonkey.com
// @include        http://groups.adobe.com/*
// @include        http://*.groups.adobe.com/*
// ==/UserScript==

function handleKeyPress(evt) {
	var e = evt.wrappedJSObject
	if (e.keyCode == 13) {
		unsafeWindow.$("#loginFormDiv").dialog("option", "buttons").Login()
	}
}

document.getElementById('signInLink').addEventListener('click', function(e) {
	document.getElementById('loginFormDiv').addEventListener('keypress', handleKeyPress , false)
}, false)