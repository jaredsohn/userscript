// ==UserScript==
// @name           Limits the size of images in the stream
// @namespace      http://userscripts.org/users/410712
// @description    Limit the size of images in the stream.
// @include        https://pod.geraspora.de/*
// ==/UserScript==
// 
// written by faldrian@pod.geraspora.de (copied this header from oli)
// IMPORTANT: Insert the name of your pod instead of pod.geraspora.de :)

var head = document.getElementsByTagName("HEAD")[0];
var style = document.createElement("style");
style.appendChild(document.createTextNode(".stream-photo{max-width: 100px !important; max-height: 100px !important} .content IMG {max-width: 100px !important; max-height: 100px !important}"));

head.appendChild(style);