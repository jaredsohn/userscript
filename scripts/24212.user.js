// ==UserScript==
// @name           Switch GMC logos
// @namespace      http://gmcextention.lewisoft.net
// @description    Change the Game Maker Community and YoYo games logos
// @include        http://gmc.yoyogames.com/*
// ==/UserScript==

logos=document.getElementById("logostrip").innerHTML
logos=logos.split("</span>")

YoYo=logos[1]
GMC=logos[0].replace("<span>",'')

document.getElementById("logostrip").innerHTML=GMC
