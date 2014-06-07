// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Ahd (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name Simple emoticons
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
buttons += emoticonButton("001", "http://img695.imageshack.us/img695/9162/emotifaceangry.gif");
buttons += emoticonButton("002", "http://img413.imageshack.us/img413/7750/emotifacebored.gif");
buttons += emoticonButton("003", "http://img840.imageshack.us/img840/5495/emotifaceconfused.gif");

buttons += emoticonButton("004", "http://img833.imageshack.us/img833/5823/emotifacecontent.gif");
buttons += emoticonButton("005", "http://img830.imageshack.us/img830/9816/emotifacecrafty.gif");
buttons += emoticonButton("006", "http://img245.imageshack.us/img245/1729/emotifacecry.gif");

buttons += emoticonButton("007", "http://img185.imageshack.us/img185/1208/emotifacedead.gif");
buttons += emoticonButton("008", "http://img80.imageshack.us/img80/8018/emotifacehappy.gif");
buttons += emoticonButton("009", "http://img42.imageshack.us/img42/2100/emotifacelaugh.gif");

buttons += emoticonButton("010", "http://img529.imageshack.us/img529/3865/emotifacelove.gif");
buttons += emoticonButton("011", "http://img28.imageshack.us/img28/9697/emotifaceno.gif");
buttons += emoticonButton("012", "http://img24.imageshack.us/img24/1605/emotifacesad.gif");
buttons += emoticonButton("013", "http://img138.imageshack.us/img138/1535/emotifaceweird.gif");

buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"17\\\" height=\\\"9\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);
