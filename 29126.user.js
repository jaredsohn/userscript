// ==UserScript==
// @name           Remove Speech Bubble When There's No New Messages
// @description    Removes the speech bubble if there's no new messages.
// @include        *soliaonline.com*
// ==/UserScript==

var PM = document.getElementById("pm_bubble")
if(PM.className=="userbar" && PM.innerHTML.match(/no new messages/i)){
PM.style.display="none"
}