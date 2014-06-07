// ==UserScript==
// @name           Remove Parentheses on Google Reader
// @namespace      http://www.overzealous.com/
// @include        http://www.google.com/reader/*
// ==/UserScript==


(function () {
	var test = /[^\(]*\((\d+)\)/;
	var old, els;
	(function(){
		setTimeout(arguments.callee, 1000);
		els = document.getElementsByClassName("unread-count");
		for(var i=0; i<els.length; i++) {
			if(els[i].innerHTML.indexOf("(") >= 0) {
				old = els[i].innerHTML;
				if(old) {
					els[i].innerHTML = old.replace(test, "&nbsp;$1&nbsp;");
				}
			}
		}
	})();
})();