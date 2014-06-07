// ==UserScript==
// @name           UnframeX Auto
// @version        1.0
// @namespace  UnframeX
// @author         Spock
// @description   Runing Unframed MW when open MW
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
var script = document.createElement("script");
script.src = "https://spocklet.com/bookmarklet/unframe.js";
document.getElementsByTagName("head")[0].appendChild(script);