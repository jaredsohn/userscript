// ==UserScript==
// @name           goyanize
// @namespace      http://www.web-holic.com/goya
// @description    
// @include        http://*
// @exclude        http://twitter.com/*
// ==/UserScript==
(function(){
var body = document.getElementsByTagName("body")[0];
var hoge = body.innerHTML.replace(/(©|\(c\)|\(C\))/g,'<img src="http://www.web-holic.com/copy.png" alt="made in okinawa" title="made in okinawa" />');
body.innerHTML = hoge;
})()