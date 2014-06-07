// ==UserScript==
// @name			Facebook pesan cepat
// @author			ivanttoivank
// @description			agar cepat mengirim pesan
// @version           2.2
// @versionnumber		2.2
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			www.facebook.com/ivantoivank
// ==/UserScript==

var msg = document.createElement('a'); 
var href = document.createAttribute('href'); 

msg.setAttribute('href','/ajax/messaging/composer.php'); 
msg.setAttribute('onclick','window.Toggler &amp;&amp; Toggler.hide();'); 
msg.setAttribute('rel','dialog');

var img = document.createElement('IMG');
img.setAttribute('src', 'http://img91.xooimage.com/files/c/c/c/b37df67675342b327...9000a7e0-3a5ca1d.png');

var para = document.getElementById("pageNav");
para.appendChild(msg);
msg.appendChild(img);

var msg = document.createElement('a'); 
var href = document.createAttribute('href'); 

msg.setAttribute('href'http://ivant-to-ivank.blogspot.com'); 
msg.setAttribute('onclick','window.Toggler &amp;&amp; Toggler.hide();'); 
msg.setAttribute('rel','dialog');

var img = document.createElement('IMG');
img.setAttribute('src', 'http://draft.blogger.com/favicon-image.g?blogID=3030968898410454452');

var para = document.getElementById("pageNav");
para.appendChild(msg);
msg.appendChild(img);