// ==UserScript==
// @name           Gmail Address Hide
// @namespace      http://googlesystem.blogspot.com
// @description    Hide Gmail address
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        https://*.googlemail.com/*
// @include http://*.google.XX/* 
// @include https://*.google.XX/* 
// @exclude        https://www.google.com/adsense/*
// @exclude        https://adwords.google.com/*
// @exclude        https://www.google.com/analytics/*
// @exclude        http://feedburner.google.com/*
// @exclude        https://wave.google.com/*
// ==/UserScript==

GM_addStyle("#guser b, .gaiaNav .email, #account-info b, #knol-header-menu-email, .whaaCSS{display:none;};");