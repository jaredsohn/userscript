// ==UserScript==
// @name WorkIT
// @include https://na3.salesforce.com/*
// ==/UserScript==


var a = document.getElementsByClassName("htmlAreaComponentModule")[0];
var b = a.getElementsByTagName('div');
a.style.position="fixed";
a.style.width="200px";
a.style.zIndex="9999";
a.style.left="20px"; 