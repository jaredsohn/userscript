// ==UserScript==
// @name           Fuck google for adding shit to my igoogle page.
// @namespace      annoying-shit
// @description    This removes the chat tab from the igoogle front page. Those fucking dicks //should not change my IGOOGLE page without my permission.
// @include        http://*.google.com/*
// ==/UserScript==
var tabchat = document.getElementById("tab_chat");
var rosterParent = document.getElementById("roster_parent");
var rosterChild = document.getElementById("roster_triangle");
if (tabchat) {
   tabchat.parentNode.removeChild(tabchat);
}
if (rosterParent) {
   rosterParent.parentNode.removeChild(rosterParent)

}
if (rosterChild) {
   rosterChild.parentNode.removeChild(rosterChild)

}
