// ==UserScript==
// @name           Redacted
// @author         me
// @description    null
// @match          http://*.reddit.com/*/*/comments/*
// @include        http://*.reddit.com/*/*/comments/*
// @version    1.02
// ==/UserScript==

var redacted = {
    modEntry: function(x) {
        for (var i = 0, len = x.length; i <= len; i++) {
            if (x[i]) {
                x[i].innerHTML = x[i].innerHTML.replace(/\[deleted\]/ig, '<span title="Need to know basis only" style="color:red !important;font-weight:bolder /!important">[redacted]</span>');
            }
        }
    },
    init: function () {
        document.body.addEventListener('DOMNodeInserted', function(event) {
             if ((event.target.tagName == 'DIV') && (/comment/ig.test(event.target.getAttribute('class')))) {
                var x = event.target.querySelectorAll('.commentarea:not(.side) .md p');
                redacted.modEntry(x);
            }
        }, false);
        var x = document.querySelectorAll('.commentarea:not(.side) .md p');
        this.modEntry(x);
    }
};
if (document.body) {
	setTimeout(function() {
		redacted.init();
	}, 3000);
}
else {
	window.addEventListener("load", function() {
		redacted.init();
	}, false);
}