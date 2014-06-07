// ==UserScript==
// @name           UaVidView for Tinyvid.tv
// @namespace      http://userscripts.org/users/98858
// @description    Replaces video tags with an enhanced player called "UaVidView" that only uses HTML and jQuery. 
// @include        http://tinyvid.tv/show/*
// @match        http://tinyvid.tv/show/*
// ==/UserScript==


var videoSrc = document.getElementById("v1").currentSrc;
document.getElementById("v1").parentNode.innerHTML = '<iframe src="http://vidview.uapps.org/?v='+videoSrc+'" style="width:640px;height:385px;border:0;" scrolling="no"></iframe>';
