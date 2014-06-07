// ==UserScript==
// @name       target2self
// @namespace  http://uedsky.com/target2self
// @version    0.2
// @description  unset all target='_blank'
// @match      http://*.brook.me/*
// @match      http://*.51jumu.com/*
// @copyright  2013, Brook Yang
// ==/UserScript==

!function() {
function closest(el, selector) {
    for(; el != document; el = el.parentNode) {
        if(el.webkitMatchesSelector(selector)) {
            return el;
        }
    }
    return null;
}
var origin = location.origin;
document.addEventListener('mousedown', function(e) {
    var target = closest(e.target, 'a');
    if(target && target.target == '_blank' && target.href.indexOf(origin) === 0) {
        target.target = '';
    }
}, false);
}();