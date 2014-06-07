// ==UserScript==
// @name           Firefox Addons - Collections Sort by Name
// @namespace      http://userscripts.org/users/musichemyst
// @author         musichemyst
// @description    Force Collections pages at AMO (addons.mozilla.org) to sort listings by Name by default.
// @include        http://addons.mozilla.org/*/collections/*
// @include        https://addons.mozilla.org/*/collections/*
// @version        0.1
// @icon           https://addons.cdn.mozilla.net/favicon.ico
// @updateURL      
// ==/UserScript==

var links = window.content.document.getElementsByTagName("a");
var regex = /^(https?:\/\/addons\.mozilla\.org\/.*\/collections\/.*\/.*\/)$/;

for (var i = 0, imax = links.length; i < imax; i++) {
   links[i].href = links[i].href.replace(regex,"$1?sort=name");
}
