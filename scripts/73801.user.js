// ==UserScript==
// @name           What.CD: Interviewers welcome script
// @namespace      http://www.what.cd
// @description    An easy way of sending a welcome pm to someone.
// @include        *inbox.php?action=compose*
// ==/UserScript==

//Usage: right click your greasemonkey head in firefox (not sure if it works in other browsers)
//and go to "User Script Commands", and choose the option to turn it on.
//Then go and pm someone. Your welcome message will automatically be pasted.
//If you turn it off, it won't.

var pm = GM_getValue("pm", true);
function pope() {
inputbox = document.getElementById('body');
inputbox.innerHTML = text;
}
if (pm == true) {
addEventListener("load", pope, true);
}
//add your welcome script within the quotation marks.
var text = "";
//add \n if you need linebreaks

GM_registerMenuCommand("PM invitee ON", function() {GM_setValue("pm", true)});
GM_registerMenuCommand("PM invitee OFF", function() {GM_setValue("pm", false)});

//alink = document.getElementById('quickpost');
//alink.innerHTML += "<br>link goes here";