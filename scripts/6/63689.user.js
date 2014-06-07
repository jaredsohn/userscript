// Gmail as Default Mailer
// basically a complete copy of Marco A. Zamora’s Bookmarklet as a Userscript
//
// ==UserScript==
// @name          Gmail as Default Mailer
// @description   make gmail default mailer
// @include       http://*
// @include       https://*
// @run-at document-start
// ==/UserScript==
(function(){var b=document,i=0,p="";while(i<b.links.length){if(b.links[i].href.indexOf("mailto")==0){p=b.links[i].href.slice(7).replace(/\?/,"&").replace(/&subject=/i,"&su=");p="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+p;b.links[i].href='javascript:window.open("'+p+'",'+'"gmail_compose_popup",'+'"left=((window.screenX||window.screenLeft)+10),'+'top=((window.screenY||window.screenTop)+10),'+'height=550px,width=650px,resizable=1,alwaysRaised=1")';}i++;}})();
