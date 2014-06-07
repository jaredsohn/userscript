// ==UserScript==
// @id servicedeskfixer
// @name servicedeskfixer
// @description ServiceDesk fixer
// @include https://servicedesk.p1.datacom.com.au/
// ==/UserScript==
//
// All your base are belong to us
var yourbases = document.getElementsByTagName("base");
for (var i=0; i<yourbases.length;i++) {
var yourbase=yourbases[i];
yourbase.parentNode.removeChild(yourbase);
}