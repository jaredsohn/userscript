// ==UserScript==
// @name       LL gfycat embedder
// @namespace  http://endoftheinter.net
// @version    0.1.0
// @description  enter something useful
// @include		/https?:\/\/((boards|archives)\.)?endoftheinter\.net\/(showmessages|postmsg|inboxthread)\.php/
// @copyright  2014+, Kim Hyoyeon
// ==/UserScript==

var gfyRegexp = /(?:gfycat\.com\/)(?!about|fetch\/)([a-zA-Z0-9]+)/;
var messages = document.getElementById('u0_1');

// Code that will be added to every img tag
// so that it turns intoself into a gfycat.
// This is needed because greasemonkey scripts run
// in a sandbox and don't have access to the `window`
// object from the page.
var injectcode = 'if (window.gfyObject) { var f = new window.gfyObject(this); f.init(); }';

function lookForLinks(container) {
	var links = container.getElementsByTagName('a');
    for (var i = 0, len = links.length; i < len; i++) {
        var link = links[i];
        var result = gfyRegexp.exec(link);
        if (result) {
            console.log('a gif', result[1]);
            var imgEl = document.createElement('img');
            imgEl.setAttribute('class', 'gfyitem');
            imgEl.setAttribute('data-id', result[1]);
            
            // A tiny invisible image used to get the `onload` event to fire.
            imgEl.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
            imgEl.setAttribute('onload', injectcode);
            link.parentNode.replaceChild(imgEl, link);
        }
    }
}

if (window.MutationObserver) {
    var observer = new window.MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                lookForLinks(mutation.addedNodes[0]);
            }
        });
    });
}
observer.observe(messages, { childList: true });

// Get gfycat code.
(function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0],
        r = false;
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.onload = s.onreadystatechange = function() {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
        	r = true;
            lookForLinks(messages);
        }
    };
    s.parentNode.insertBefore(g, s);
}(document, 'script'));
