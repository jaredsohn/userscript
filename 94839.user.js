// ==UserScript==
// @name           Force HTTPS on Facebook
// @namespace      Force HTTPS on Facebook
// @description    Forces Facebook to connect to HTTPS
// @include        https://www.facebook.com/*
// ==/UserScript==

function httpsAll(){
   var tFBUnsecureConnection = "http:";
   var tFBSecureConnection = "https:";
   var tFBPageContent = document.body.innerHTML;
   while (tFBPageContent.indexOf(tFBUnsecureConnection) >= 0) {
      var i = tFBPageContent.indexOf(tFBUnsecureConnection);
      var j = find.length;
      tFBPageContent = tFBPageContent.substr(0,i) + tFBSecureConnection + tFBPageContent.substr(i+j);
   }
   document.body.innerHTML = tFBPageContent;
   document.title = document.title + " - [Forced]";
}

window.onload = httpsAll();