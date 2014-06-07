// JavaScript Document
// ==UserScript==
// @name           block youku ad
// @author         Author
// @namespace      spoof
// @description    spoof userAgent
// @include        http://v.youku.com/*
// @version        0.1
// ==/UserScript==
/*
*/

var userAgent = 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'
var script = document.createElement("script");
script.type = "text/javascript";
script.innerText += '(function(){var new_navigator = new function() {};';
script.innerText += 'var x;';
script.innerText += 'for (x in navigator) {';
script.innerText += 'eval("new_navigator." + x + " = navigator." + x + ";");';
script.innerText += '}';
script.innerText += 'new_navigator.appVersion = "' + userAgent + '";';
script.innerText += 'new_navigator.userAgent = "' + userAgent + '";';
script.innerText += 'window.navigator = new_navigator;})()';
document.documentElement.insertBefore(script);