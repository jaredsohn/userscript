// ==UserScript==
// @name       YouTube Subscriptions Shortcut
// @namespace  http://www.mochatavern.com/
// @version    1.1
// @description  Changes link for YouTube logo to the subscriptions
// @match      http://*.youtube.com/*
// @match      https://*.youtube.com/*
// @copyright  2012
// ==/UserScript==
var logo = document.getElementById('logo-container');
if (logo) logo.href = "/feed/subscriptions/u";