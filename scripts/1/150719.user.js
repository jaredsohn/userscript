// ==UserScript==
// @id             WeiboRecommendKiller
// @name           WeiboRecommendKiller
// @version        1.2
// @namespace      
// @author         raulchen
// @description    
// @include        http://weibo.com/*
// ==/UserScript==

var css_str="div[class='W_layer'][stk-mask-key]{display:none;} div[style$='z-index: 10001;']{display:none;}";
var style=document.createElement('style');
style.type='text/css';
style.textContent=css_str;
document.getElementsByTagName('head')[0].appendChild(style);