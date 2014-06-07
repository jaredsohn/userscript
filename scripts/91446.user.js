// ==UserScript==
// @name           google blacklist
// @namespace      http://twitter.com/kosugi
// @include        http://www.google.co.jp/search?*
// @include        http://www.google.com/search?*
// @description    excludes unsolicited google results by blicklist. by default, this script is configured for excluding dumb translation sites.
// ==/UserScript==

new function() {

    var patterns = [
            /^http:\/\/ja\.w3support\.net\//,
            /^http:\/\/ja\.efreedom\.com\//,
            /^http:\/\/www\.programmershere\.com\/ja\//,
            /^http:\/\/ja\.nulledzone\.info\//,
            /^http:\/\/vidtaker\.com\//,
    ];
    var numPatterns = patterns.length;

    var doIt = function(e) {
        var url, m, n, xs = e.target.querySelectorAll('div#ires > ol > li'), len = xs.length;
        for (n = 0; n < len; ++n) {
            url = xs[n].querySelector('a.l').href;
            for (m = 0; m < numPatterns; ++m) {
                if (url.match(patterns[m])) {
                    xs[n].style.display = 'none';
                    break;
                }
            }
        }
    }

    setTimeout(function() {
        doIt({target:document});
        window.addEventListener('AutoPagerize_DOMNodeInserted', doIt, false);
    }, 0);
}
