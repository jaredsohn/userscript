// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by milk (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name milk
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
buttons += emoticonButton("001", "http://img841.imageshack.us/img841/5007/milkbigsmile.gif");
buttons += emoticonButton("002", "http://img844.imageshack.us/img844/7533/milkblush.gif");
buttons += emoticonButton("003", "http://img832.imageshack.us/img832/7606/milkcry.gif");

buttons += emoticonButton("004", "http://img827.imageshack.us/img827/883/milkdrained.gif");
buttons += emoticonButton("005", "http://img826.imageshack.us/img826/3186/milkfrown.gif");
buttons += emoticonButton("006", "http://img833.imageshack.us/img833/7020/milkgasp.gif");

buttons += emoticonButton("007", "http://img831.imageshack.us/img831/2867/milkhearts.gif");
buttons += emoticonButton("008", "http://img227.imageshack.us/img227/1275/milko.gif");
buttons += emoticonButton("009", "http://img833.imageshack.us/img833/9498/milksad.gif");

buttons += emoticonButton("010", "http://img829.imageshack.us/img829/5451/milkshh.gif");
buttons += emoticonButton("011", "http://img843.imageshack.us/img843/7883/milksmile.gif");
buttons += emoticonButton("012", "http://img839.imageshack.us/img839/29/milktongue.gif");
buttons += emoticonButton("013", "http://img441.imageshack.us/img441/9562/milkwink.gif");
buttons += emoticonButton("014", "http://img831.imageshack.us/img831/9229/milkyuck.gif");
buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"14\\\" height=\\\"12\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);