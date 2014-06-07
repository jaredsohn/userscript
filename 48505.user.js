// ==UserScript==
// @name           AutoPagerizeTwitterFilter
// @namespace      http://relucks.org/
// @include        http://twitter.com/
// ==/UserScript==

(function() {
    var reqfl = function(opt) {
        opt['headers'] = opt['headers'] || {}
        opt['headers']['Accept'] = 'application/json, text/javascript, */*'
    }
    var resfl = function(res, url) {
        var r = eval('(' + res.responseText + ')')
        res.responseText = '<html><body><div>' +
            r['#pagination'] + r['#timeline'] +
            '</div></body></html>'
        res.finalUrl = null
    }
    setTimeout(function() {
        if (window.AutoPagerize) {
            if (window.AutoPagerize.addResponseFilter) {
                window.AutoPagerize.addResponseFilter(resfl)
            }
            if (window.AutoPagerize.addRequestFilter) {
                window.AutoPagerize.addRequestFilter(reqfl)
            }
        }
    }, 0)
})()
