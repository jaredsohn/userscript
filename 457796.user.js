// ==UserScript==
// @name Webm looper
// @namespace http://userscripts.org/users/643136
// @description Loops webms on 4chan
// @include http://i.4cdn.org/*.webm
// baby's first script be gentle with me :)
// ==/UserScript== 

var p = document.body.getElementsByTagName("video")[0];
p.setAttribute("loop", "");