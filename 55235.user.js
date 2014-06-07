// ==UserScript==
// @name           kaixinIcode
// @namespace      bebekan.com.cn
// @description    remove kaixin001.com identifying code
// @include        http://www.kaixin001.com/
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==



var exDate = new Date();
var exDateString = exDate.toGMTString(); 
document.cookie = "_uid=;domain=.kaixin001.com;expires="+exDateString;