// ==UserScript==
// @author         laom32
// @version        0.1
// @name           Remover Timeline
// @namespace      laom_32_@_hotmail_._com
// @description    Remove timeline from Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @scriptsource   http://userscripts.org/scripts/show/8228
// ==/UserScript==

document.getelementbyid("pagelet_rhc_ticker").style.visibility='hidden';