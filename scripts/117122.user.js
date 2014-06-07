// ==UserScript==
// @name                Keyboard Shortcut for Google Reader with G+ [2]
// @version             v1.0 (2011/11/01)
// @namespace	        hecomi
// @include		http*://plusone.google.com/*
// ==/UserScript==

(function(){
	var onMessage = function(e){
		switch (e.data) {
		case "plus":
			var button   = document.getElementById("button");
			var click    = document.createEvent("MouseEvents");
			click.initEvent("click");
			button.dispatchEvent(click);
			break;
		}
	}
	window.addEventListener("message", onMessage, false);
})();
