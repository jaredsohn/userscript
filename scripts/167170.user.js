// ==UserScript==
// @name       Remove SvD.se Paywall
// @namespace  se.svd.removepw
// @version    2
// @description  Removes the paywall on SvD.se
// @match      http://www.svd.se/*
// @copyright  Nope, no copyright whatsoever!
// ==/UserScript==

for (f in unsafeWindow) { 
    if (f.match(/svd_pw_close_\d+/)) {
        unsafeWindow[f]();
    }
}