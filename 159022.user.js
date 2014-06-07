// ==UserScript==
// @name           Armorpiercing
// @namespace      quad
// @description    Remove annoying parts of armorgames
// @include        http://armorgames.*
// ==/UserScript==

foot=document.getElementById("footer")
if (foot != null){
foot.parentNode.removeChild(foot);
}
ele=document.getElementById("profileblock")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("sidebarhome")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("adblock")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("adblocktwo")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("tags")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("gameinteractive")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("social")
if (ele != null){
ele.parentNode.removeChild(ele);
}