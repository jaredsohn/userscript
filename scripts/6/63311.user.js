// ==UserScript==
// @name           Megavideo Unlimited
// @namespace      Megavideo Hack
// @include        http://www.megavideo.com/?v=*
// ==/UserScript==
javascript:s1=document.getElementById('playerbg').innerHTML.toString();s2=escape(s1.substr(s1.indexOf('flashvars.un'),128));location.href='http://www.maxedroom.com/videos/MaxMegaVideo.html?input='+s2;
