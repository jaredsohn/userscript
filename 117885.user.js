// ==UserScript==
// @name           Reddit - Show source subreddit (bestof)
// @author         gavin19
// @description    Show source subreddit instead of 'reddit.com' in bestof.
// @match          http://*.reddit.com/r/bestof*
// @include        http://*.reddit.com/r/bestof*
// @version    	   1.01
// ==/UserScript==

var showSourceSub = {

    replaceDomain: function(x) {
    	var s, d;
        for (var i = 0, lenx = x.length; i < lenx; i++) {
            if (x[i].getAttribute('href') && x[i].getAttribute('href').indexOf('bestof')===-1) {
            	s = x[i].getAttribute('href').split('/');
            	d = s[0]+'//'+s[2]+'/'+s[3]+'/'+s[4]; 
            	x[i].parentNode.querySelector('.domain').innerHTML='('+'<a href="'+d+'">'+s[4]+'</a>'+')';
            }
        }
    },
    init: function() {
        var x = document.querySelectorAll('.content .thing a.title');
        document.body.addEventListener('DOMNodeInserted', function(event) {
            if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') != -1)) {
                x = event.target.querySelectorAll('.thing a.title');
                showSourceSub.replaceDomain(x);
            }
        }, false);
        this.replaceDomain(x);
    }
}
if (document.body) {
	setTimeout(function() {
		showSourceSub.init();
	}, 300);
}
else {
	window.addEventListener("load", function() {
		showSourceSub.init();
	}, false);
}