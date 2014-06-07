// ==UserScript==
// @name Avoid "local candidates only" jobs (LinkedIn)
// @include http://www.linkedin.com/jobs?*
// @include https://www.linkedin.com/jobs?*
// ==/UserScript==

if(~document.body.innerHTML.search("Local candidates only")) {
window.history.back();
}