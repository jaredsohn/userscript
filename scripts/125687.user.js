// ==UserScript==
// @name           Clip2Pet Purifier
// @description    Removes all except the image from the clip2net.com screenshot page.
// @version        1.0.0
// @author         Neris Ereptoris (www.neris.ws)
// @namespace      http://neris.ws/Clip2NetPurifier
// @match          http://clip2net.com/s/*
// @include        http://clip2net.com/s/*
// @uso:script     125687
// @scriptsource   http://userscripts.org/scripts/show/125687
// ==/UserScript==

var image = document.getElementById("origimage");
document.body.innerHTML = "";
document.body.appendChild(image);
document.body.style.cssText = "text-align: center !important; padding-top: 50px; background: gray;";
image.style.cssText = "float: none; box-shadow: 0pt 0pt 15px black;";