// ==UserScript==
// @name nCrypt.in redirect to source link
// @namespace http://userscripts.org/users/471458
// @author pegasusph
// @description Automatically redirect to source (unencrypted) URL
// @match http://*.ncrypt.in/link-*
// @version 2
// ==/UserScript==

window.location.href = document.getElementsByTagName("frame")[0].src;