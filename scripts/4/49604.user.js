// ==UserScript==
// @name           .
// @namespace      .
// @description    .
// @include        http://apps.facebook.com/fishwrangler/*
// @version        0.0.0
// ==/UserScript==

var timeleft = a8138090269_document.getElementById('timer_hidden').getValue();
alert(timeleft);

if(timeleft > 0) {
   timeoutvalue = parseInt(timeleft) + Math.round(Math.random() * 30) + 3) * 1000;
   alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';} , timeoutvalue);
}