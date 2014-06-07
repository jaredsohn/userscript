// ==UserScript==
// @name openddmalink
// @namespace  http://userscripts.org/scripts/show/186738
// @version    0.2
// @description  Open link in dd.ma directly
// @create         2012-12-25
// @lastmodified   2013-12-25
// @updateURL      http://userscripts.org/scripts/source/186738.meta.js
// @downloadURL    http://userscripts.org/scripts/source/186738.user.js
// @match      http://*.dd.ma/*
// ==/UserScript==

(function openddmalink() {
	var link_a = document.getElementById('btn_open').getElementsByTagName('a')[0],
        real_link = link_a && link_a.href ? link_a.href : undefined;

    if (real_link) {
        location.href = real_link;
    }
})();