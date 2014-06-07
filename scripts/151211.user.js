// ==UserScript==
// @name       Google ana sayfa minimalize
// @namespace  http://userscripts.org/users/471395
// @version    0.3
// @updateURL    http://userscripts.org/scripts/source/151211.meta.js
// @downloadURL  http://userscripts.org/scripts/source/151211.user.js
// @description  google ana sayfasını minimalize eder
// @match      https://www.google.com.tr/*
// @copyright  2012+, TereChan
// ==/UserScript==

var el = document.getElementById("gbu");
el.innerHTML = "";

var footer = document.getElementById("footer");
footer.innerHTML = "";

var toolbar = document.getElementById("gbx3");
toolbar.style.opacity = 0.6;