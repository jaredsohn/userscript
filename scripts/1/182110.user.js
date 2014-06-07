// ==UserScript==
// @name        Auto login for acttv.in
// @namespace   acttv auto clicker
// @description Automatically logs in when you open acttv.in site and if password is remembered in browser
// @grant       none
// @include     *portal.acttv.in*
// @version      1.0
// @author       Ranjith
// ==/UserScript==
var TargetLink = $("a:contains('LOGIN')")

if (TargetLink.length)
    window.location.href = TargetLink[0].href