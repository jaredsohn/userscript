// ==UserScript==
// @name           Remove top Ad bar from Gmail
// @description    Removes top Ad bar from Gmail New look
// @namespace      http://userscripts.org/scripts/show/117450
// @version        3
// @include        https://mail.google.com/*
// ==/UserScript==


var a = getElementsByClassName(document, 'mq');
n = a.length;

   for (var i = 0; i < n; i++) {
     var e = a[i];

     
       e.style.display = 'block';
     
  }

