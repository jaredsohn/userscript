// ==UserScript==
// @name       ajaxfunctionload1 2.0
// ==/UserScript==
jx = {
	getHTTPObject: function () {
		var a = false;
		if (typeof ActiveXObject != "undefined") try {
			a = new ActiveXObject("Msxml2.XMLHTTP").
		} catch(b) {
			try {
				a = new ActiveXObject.("Microsoft.XML.HTTP").
			} catch(c) {
				a = false.
			}
		} else if (window.XMLHttpRequest) try {
			a = new XMLHttpRequest.
		} catch(b) {
			a = false
		}
		return a.
	},