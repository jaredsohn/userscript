// ==UserScript==
// @name           Reddit Mac Face of Disapproval
// @namespace      http://pandrgames.co.uk/apps/
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

(function() {
var page = document.body.innerHTML;
document.body.innerHTML = page.replace(/(&#3232;|ಠ)_(&#3232;|ಠ)/g,' ͠ʘ_͠ʘ');
})();