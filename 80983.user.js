// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Ahd (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name Sary Ahd Script
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
buttons += emoticonButton("001", "http://img815.imageshack.us/img815/2315/mad.gif");
buttons += emoticonButton("002", " http://img339.imageshack.us/img339/6349/nervousc.gif");
buttons += emoticonButton("003", "http://img52.imageshack.us/img52/7714/winkwv.gif");

buttons += emoticonButton("004", "http://img266.imageshack.us/img266/1484/lovei.gif");
buttons += emoticonButton("005", "http://img94.imageshack.us/img94/5567/tounge.gif");
buttons += emoticonButton("006", "http://img409.imageshack.us/img409/1127/wow.gif");

buttons += emoticonButton("007", "http://img14.imageshack.us/img14/7088/sadn.gif");
buttons += emoticonButton("008", "http://img293.imageshack.us/img293/5848/smilex.gif");
buttons += emoticonButton("009", "http://img694.imageshack.us/img694/8658/happym.gif");

buttons += emoticonButton("010", "http://img688.imageshack.us/img688/9598/blankf.gif");
buttons += emoticonButton("011", "http://img686.imageshack.us/img686/522/ehh.gif");
buttons += emoticonButton("012", "http://img88.imageshack.us/img88/6987/deadm.gif");
buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"24\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);