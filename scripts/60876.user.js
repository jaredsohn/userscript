// ==UserScript==
// @name           Alliance & Leicester Auto Logout Confirm
// @namespace      http://userscripts.org/users/71721
// @description    Automatically confirms logout when you click logout
// @include        https://www.mybank.alliance-leicester.co.uk/login/L7loggedin.asp
// ==/UserScript==

(function() {
	var anchors = document.getElementsByTagName('input');
	for (var i = 0; i < anchors.length; i++) {
		if (anchors[i].id == "submit1") {
			document.location.href = anchors[i].parentNode.action;
		}
	}
})();