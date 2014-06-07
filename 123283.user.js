// ==UserScript==
// @name           Reddit - Replace imgur links with filmot and reddit with godlessnews
// @namespace     http://userscripts.org/scripts/123283
// @author        Kola
// @description    Replaces imgur links with filmot mirror ones and reddit with godlessnews
// @match          http://*.reddit.com/*, http://*.godlessnews.com
// @include          http://*.reddit.com/*, http://*.godlessnews.com
// @version    1.0
// ==/UserScript==

var replaceImgur = {

    repLinks: function changeLinks(ele) {
        for (var i = 0, len = ele.length; i < len; i += 1) {
            ele[i].href = ele[i].href.replace('imgur', 'filmot').replace('reddit', 'godlessnews');
            if (ele[i].srcurl) {
                ele[i].srcurl = ele[i].srcurl.replace('imgur', 'filmot').replace('reddit', 'godlessnews');
            }
        }
    },

    init: function() {
        var ele, loc = window.location.href;
        if (loc.match(/\/comments\//i)) {
            ele = document.querySelectorAll('.commentarea:not(.side) .sitetable .md a');
            this.repLinks(ele);
            document.body.addEventListener('DOMNodeInserted', function(event) {
             if ((event.target.tagName == 'DIV') && (/comment/ig.test(event.target.getAttribute('class')))) {
                    ele = event.target.querySelectorAll('.md a');
                    replaceImgur.repLinks(ele);
                }
            }, false);
        } else {
            ele = document.querySelectorAll('.sitetable .thing a.title, .sitetable a.comments');
            this.repLinks(ele);
            document.body.addEventListener('DOMNodeInserted', function(event) {
                if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') != -1)) {
                    ele = event.target.querySelectorAll('.thing a');
                    replaceImgur.repLinks(ele);
                }
            }, true);
        }
    }
};

if (document.body) {
	setTimeout(function() {
		replaceImgur.init();
	}, 3000);
}
else {
	window.addEventListener("load", function() {
		replaceImgur.init();
	}, false);
}