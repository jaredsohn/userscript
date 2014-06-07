// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Ahd (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name Duck Emoticons
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
buttons += emoticonButton("001", "http://img341.imageshack.us/img341/3940/1happy.gif");
buttons += emoticonButton("002", "http://img685.imageshack.us/img685/216/2laughy.gif");
buttons += emoticonButton("003", "http://img714.imageshack.us/img714/2694/3cry.gif");

buttons += emoticonButton("004", "http://img705.imageshack.us/img705/2097/4sad.gif");
buttons += emoticonButton("005", "http://img295.imageshack.us/img295/2794/5angry.gif");
buttons += emoticonButton("006", "http://img651.imageshack.us/img651/2948/6embarassed.gif");

buttons += emoticonButton("007", "http://img691.imageshack.us/img691/5357/7love.gif");
buttons += emoticonButton("008", "http://img694.imageshack.us/img694/462/8confused.gif");
buttons += emoticonButton("009", "http://img514.imageshack.us/img514/3473/9wink.gif");

buttons += emoticonButton("010", "http://img143.imageshack.us/img143/6066/10non.gif");
buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"12\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);
