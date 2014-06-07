// ==UserScript==
// @name           Wikipedia logged out alert
// @author         gurb
// @version        0.1
// @namespace      wikipedia.org
// @description    Warns the user when attempting to edit a page while logged out
// @updateURL      https://userscripts.org/scripts/source/180569.meta.js
// @downloadURL    https://userscripts.org/scripts/source/180569.user.js
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// ==/UserScript==

if ((document.URL).indexOf("=edit") !== -1) {
    if ($("#pt-userpage").length === 0) {
        alert ("You are not logged in!");
    }
}