// ==UserScript==
// @name           Plurker 2 _blank (fixed by Kiss K D)
// @namespace      tag:kris7topher@gmail.com,2008-01-07:Plurker2blank
// @include        http://www.plurk.com/*
// ==/UserScript==

(function() {
setTimeout(function() {
as = document.getElementsByTagName('a');
for (i = 0; i<as.length; i++) {
if (as[i].className == "name" || "ex_link" ) as[i].setAttribute('target', '_blank');
}
setTimeout(arguments.callee, 1000);
}, 1000);
})();