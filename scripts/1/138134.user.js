// ==UserScript==
// @name       10fastfingers-remove-ads
// @namespace  http://namingcrisis.net/
// @version    0.1
// @description Removes ads from 10fastfingers.com; honestly I don't mind ads, except stupid animated ones which distract you from typing!
// @match      http://*10fastfingers.com/*
// @copyright  2012+, Kamal Advani
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("div#ad-main").attr("style", "display: none");
