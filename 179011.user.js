// ==UserScript==
// @name			Messages AhmedKasem
// @author			AhmedKasem
// @description			envois un message sur facebook plus rapidement (http://www.facebook.com/eng.ahmedkasem)
// @version           2.2
// @versionnumber		2.2
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://www.facebook.com/eng.ahmedkasem
// ==/UserScript==

var msg = document.createElement('a'); 
var href = document.createAttribute('href'); 

msg.setAttribute('href','/ajax/messaging/eng.ahmedkasem'); 
msg.setAttribute('onclick','window.Toggler &amp;&amp; Toggler.hide();'); 
msg.setAttribute('rel','dialog');

var img = document.createElement('IMG');
img.setAttribute('src', 'http://img91.xooimage.com/files/c/c/c/b37df67675342b327...9000a7e0-3a5ca1d.png');

var para = document.getElementById("pageNav");
para.appendChild(msg);
msg.appendChild(img);