// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by uninii (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name uninini
// @namespace http://sary-ahd.blogspot.com
// @description Blogger
// @include http://*.blogger.com/post-edit.g?*
// @include http://*.blogger.com/post-create.g?*
// ==/UserScript==
window.addEventListener("load", function(e) {
function setemoticons(domname)
{
var editbar = document.getElementById(domname);
if (editbar) {
var buttons = "<br />";
buttons += emoticonButton("001", "http://img607.imageshack.us/img607/7753/emoangry.png");
buttons += emoticonButton("002", "http://img833.imageshack.us/img833/2111/emoblank.png");
buttons += emoticonButton("003", "http://img833.imageshack.us/img833/5461/emocry.png");

buttons += emoticonButton("004", "http://img573.imageshack.us/img573/5552/emocute.png");
buttons += emoticonButton("005", "http://img294.imageshack.us/img294/2655/emodissapointed.png");
buttons += emoticonButton("006", "http://img560.imageshack.us/img560/2882/emohappy.png");

buttons += emoticonButton("007", "http://img109.imageshack.us/img109/5938/emolol.png");
buttons += emoticonButton("008", "http://img130.imageshack.us/img130/4531/emolove.png");
buttons += emoticonButton("009", "http://img526.imageshack.us/img526/7795/emomad.png");

buttons += emoticonButton("010", "http://img838.imageshack.us/img838/7069/emonormal.png");
buttons += emoticonButton("011", "http://img574.imageshack.us/img574/2319/emosad.png");
buttons += emoticonButton("012", "http://img225.imageshack.us/img225/5084/emoshocked.png");
buttons += emoticonButton("013", "http://img41.imageshack.us/img41/9778/emoshutmouth.png");
buttons += emoticonButton("014", "http://img151.imageshack.us/img151/8951/emosmile.png");


buttons += emoticonButton("015", "http://img149.imageshack.us/img149/3537/emostrawberry.png");
buttons += emoticonButton("016", "http://img294.imageshack.us/img294/6816/emosweet.png");
buttons += emoticonButton("017", "http://img837.imageshack.us/img837/7813/emothx.png");
buttons += emoticonButton("018", "http://img835.imageshack.us/img835/8323/emotounge.png");
buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"40\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);