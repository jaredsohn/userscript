// ==UserScript==
// @name       Remove SvD.se Paywall
// @namespace  se.svd.removepw
// @version    4
// @description  Removes the paywall on SvD.se
// @match      http://www.svd.se/*
// @copyright  Nope, no copyright whatsoever!
// ==/UserScript==

var m = [];
for (f in unsafeWindow) { 
    if (f.match(/[^\d]{9}\d{9}/)) {
        m.push(f);
    }
}
eval(m[m.length-1] + '()');
