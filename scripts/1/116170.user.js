// ==UserScript==
// @name           Reddit - Collapse deleted comments
// @namespace  http://userscripts.org/scripts/show/116170
// @author         gavin19
// @description    Collapse deleted comments.
// @match          http://*.reddit.com/*/*/comments/*
// @include        http://*.reddit.com/*/*/comments/*
// @version	   	   1.02
// ==/UserScript==

var collapseComments = {

    hideDeleted: function(x) {
        for (var i = 0, lenx = x.length; i < lenx; i++) {
            if (x[i]) {
                x[i].parentNode.setAttribute('style', 'display:none !important');
            }
        }
    },
    init: function() {
        document.body.addEventListener('DOMNodeInserted', function(event) {
            if ((event.target.tagName == 'DIV') && (/comment/ig.test(event.target.getAttribute('class')))) {
                var x = event.target.querySelectorAll('.content .grayed');
                collapseComments.hideDeleted(x);
            }
        }, false);
        var x = document.querySelectorAll('.content .grayed');
        this.hideDeleted(x);
    }
};
if (document.body) {
	setTimeout(function() {
		collapseComments.init();
	}, 3000);
}
else {
	window.addEventListener("load", function() {
		collapseComments.init();
	}, false);
}