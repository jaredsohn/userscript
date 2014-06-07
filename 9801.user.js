// ==UserScript==
// @name           Yahoo Weather
// @namespace      yahoo
// @description    Hide generic Yahoo headers, show Doppler radar image
// @include        http://weather.yahoo.com/forecast/*
// ==/UserScript==
//
// Author: Matthew Botos (http://matthewbotos.com)

// styles
GM_addStyle('.yui-t6 { margin: 0 0 0 50px !important; }');
GM_addStyle('#yui-main { margin: 0 0 0 -80px !important; }');
GM_addStyle('.yui-t6 #yui-main .yui-b { margin-right:25em; display: block !important;}');
GM_addStyle('.yui-b { display: none; }');
// hide headers
GM_addStyle('#ygma, #yw-hdmenu, #yw-submenu, #yw-hdsearch, #yw-featuredforecast { display: none; }'); 
// adjust to new width
GM_addStyle('#doc { min-width: 900px; }');

// find radar URL and convert to image
var mapLinks = document.evaluate(
  "//div[@class='yw-radar']/ul/li[@class='even']/a",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);
var dopplerLink = mapLinks.snapshotItem(0).href;
var dopplerImg = dopplerLink.replace("img","images");
dopplerImg = dopplerImg.replace("html","jpg");
var img = document.createElement("img");
img.src = dopplerImg;
img.style.position = 'absolute';
img.style.top = '110px';
img.style.left = '500px';

// insert radar image
var main = document.getElementById("yui-main");
main.parentNode.insertBefore(img, main);
