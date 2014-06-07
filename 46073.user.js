// ==UserScript==
// @name           Blip Private Quotes
// @namespace      privateQuotes
// @description    privateQuotes
// @include        http://www.blip.pl/*
// @include        http://blip.pl/*
// ==/UserScript==
document.getElementsByTagName("head")[0].innerHTML+='<style type="text/css">span.quote{text-decoration:none!important;color:#222!important;cursor:pointer!important;}</style>';window.addEventListener("click",function(e){if(e.target.getAttribute('class')=='quote'&&e.target.nodeName=='SPAN'){e.preventDefault();document.getElementById('status-entry').value+='( '+e.target.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("href")+' )';}}, false);