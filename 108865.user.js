// ==UserScript==
// @name           center djangoproject.com
// @namespace      center djangoproject.com
// @description    center djangoproject.com
// @include        https://*.djangoproject.com/*
// ==/UserScript==
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "#container { margin: 0 auto }";
document.body.appendChild(css);