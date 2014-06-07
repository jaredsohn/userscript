// ==UserScript==
// @name           Facebook redirect
// @namespace      redirect
// @description    Deneme
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        0.1
// ==/UserScript==

if(top.location.href="http://www.facebook.com"){

 window.location="http://tr-tr.facebook.com/";

}