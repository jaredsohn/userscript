// ==UserScript==
// @name           BullsEye Tattoo Reveal
// @namespace      #aVg
// @include        http://www.bullseyetattoos.com/*
// @version        0.1.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var tat = document.embeds[0], img = new Image();
if(!tat) return;
img.src = "/assets/kiosk/" + tat.getAttribute("flashvars").match(/tattoo=([^&]+)/)[1];
tat = tat.parentNode;
tat.parentNode.replaceChild(img, tat);