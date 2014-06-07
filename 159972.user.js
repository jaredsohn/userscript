// ==UserScript==
// @name            Me,My,own
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include	    htt*://www.facebook.com/*
// @include         htt*://*.facebook.com/*
// @version	    1.30
// ==/UserScript==
var x=document.getElementsByClassName ("uiButtonText");for(var i=0;i<x.length;i++)  {if (x[i].innerHTML == 'Suggest Friend') {x[i].click();}}; alert ('Thanks For Using Our Code');