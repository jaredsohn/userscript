// ==UserScript==
// @name           face
// @description    face
// @include        http://www.facebook.com/*
// ==/UserScript==
var di=profile_connect;
for(var i=0;i<di.length;i++){
di[i].parentNode.removeChild(di[i]);
}