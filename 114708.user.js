// ==UserScript==
// @name          nanashi
// @namespace     http://userstyles.org
// @description	  nanashi
// @author        kawau
// @match         http://plus.google.com/*
// @match         https://plus.google.com/*
// @match         http://*.plus.google.com/*
// @match         https://*.plus.google.com/*
// @run-at        document-idle
// ==/UserScript==
(function() {

document.styleSheets[0].addRule('a.Nm,a.yn,span.px,span.tB', 'display:none !important');

})();