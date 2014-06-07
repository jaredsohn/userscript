// ==UserScript==
// @name Is It Down Right Now ? | Reek
// @namespace https://userscripts.org/scripts/show/457676
// @updateURL https://userscripts.org/scripts/source/457676.meta.js
// @downloadURL https://userscripts.org/scripts/source/457676.user.js
// @description "Is It Down Right Now" monitors the status of your favorite web sites and checks whether they are down or not. Check a website status easily by using the below test tool. Just enter the url and a fresh site status test will be perfomed on the domain name in real time using our online website checker tool. For detailed information, check response time graph and user comments.
// @author Reek | http://reeksite.com/
// @version 1.0
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @icon http://i.imgur.com/SnJErKp.png
// @include http*://*
// @run-at document-start
// ==/UserScript==
/*=====================================================
  Script
======================================================*/

GM_registerMenuCommand("Is It Down Right Now ?", function () {
  location.href = "http://www.isitdownrightnow.com/downorjustme.php?url="+location.host;
});
