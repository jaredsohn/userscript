// ==UserScript==
// @name           Disconnect²
// @namespace      Disconnect
// @description    Disconnect
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

var which2 = document.getElementById('which2');
  
 document.addEventListener('keypress', function(e) {
	if(e.which == 69)
	{ var getit=document.getElementById('connect');
var see=getit.firstChild;
window.location.href=see.href;
 }
  }, false);