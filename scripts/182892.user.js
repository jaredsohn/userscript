// ==UserScript==
// @name       Facebook Logout Just Press Alt+L
// @namespace  
// @version    1.1.0
// @description  Press Alt+L to logout
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.tld/*
// @include        http*://facebook.tld/*
// @grant          none
// @copyright      Devendra Pratap Singh
// ==/UserScript==


var eventUtility = {
    addEvent : function(el, type, fn) {
        if (typeof addEventListener !== "undefined") {
            el.addEventListener(type, fn, false);
        } else if (typeof attachEvent !== "undefined") {
            el.attachEvent("on" + type, fn);
        } else {
            el["on" + type] = fn;
        }
    }
};


(function() {
	eventUtility.addEvent(document, "keydown",
		function(evt) {
			var code = evt.keyCode,
			altKey = evt.altKey;
            
			if (altKey && code === 76) {
				document.getElementById("logout_form").submit();
			}
		});
}());