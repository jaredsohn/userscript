// ==UserScript==
// @name  rotate
// @namespace  http://*/
// @description rotate images
// @include http://*/*
// @exclude
// ==/UserScript==

fnc = function(){var kepecske=document.images;var ua=navigator.userAgent.toLowerCase();for(i=0; i<kepecske.length; i++){if(ua.indexOf( "msie" ) != -1 ){kepecske[i].style.filter ='progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';}else if ((ua.indexOf( "webkit" ) != -1) || (ua.indexOf( "mozilla" ) != -1) ){kepecske[i].setAttribute('style',"-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);");}}};
fnc();