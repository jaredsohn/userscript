// ==UserScript==
// @name           Facebook Autolike
// @namespace      http://www.aintaer.com/
// @description    Automatically Likes everything on the home stream
// @include        https://www.facebook.com/
// @include        http://www.facebook.com/
// @match          *://www.facebook.com/
// @version        1.1
// ==/UserScript==

var $$ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

function checkLikes() {
	var llist = $$("ul#home_stream > li.pvm button.like_link[name=like]");
	var f = (function() {
		var i=llist.length-1;
		if (i<0) return null;
		return function() {
			llist[i--].click();
			if (i<0) window.clearInterval(likeq);
		}})();
	if (f) var likeq = window.setInterval(f,100);
}

checkLikes();
window.setInterval(checkLikes,10000);
