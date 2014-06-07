// ==UserScript==
// @name           blank2self 
// @namespace      http://abhiomkar.in
// @description    blank2self
// @include        http://*
// @include        https://*
// @version        0.1
// ==/UserScript==
aTags = document.getElementsByTagName("a"); for(i=0; i< aTags.length; i++) { aTags[i].target = "_self"; }