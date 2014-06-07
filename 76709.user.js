// ==UserScript==
// @name           Filmot Replacement
// @namespace      http://natemcbean.com
// @description    swap imgur to filmot
// @include        http://*
// @include        https://*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/imgur/g,'filmot')