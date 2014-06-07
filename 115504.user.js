// ==UserScript==
// @name           bhw mtrlss script
// @namespace      bhw
// @include        http://motherless.com/*
// ==/UserScript==

var link = document.createElement("a");
link.className = "head_link";
link.innerHTML = "BHW-Download Video";
link.href = /file=([^&]*)/.exec(document.querySelector("#player").getAttribute("flashvars"))[1];
document.querySelectorAll(".sub_menu")[0].appendChild(link);