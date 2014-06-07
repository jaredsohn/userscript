// ==UserScript==
// @name           MightyText Disable Alerts
// @author         SystemDisc 
// @namespace      http://zornco.net
// @description    Disable all javascript alerts on MightyText
// @version        1.0
// @grant          none
// @include        https://mightytext.net/app/*
// @include        http://mightytext.net/app/*
// @run-at         document-start
// @copyright      2012 ©SystemDisc
// ==/UserScript==

unsafeWindow.alert = function() {};