// ==UserScript==
// @name           mytoutube and paid2youtube
// @namespace      mytoutube and paid2youtube
// @description    mytoutube and paid2youtube
// @include        http://*.myyoutubeviews.com/*
// @include        http://*.paid2youtube.com/*
// ==/UserScript==

var bodycontent = document.body.innerHTML;
// get the body content

var count = bodycontent.indexOf("An internal server error has occured!");
// count if the Error 500 is displayed

if(count>='0'){
window.location = window.location;
// im not using window.reload because thats sending possible post request again.
}

// Created because: http://userscripts.org/topics/60039