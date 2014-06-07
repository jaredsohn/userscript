// JavaScript Document// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Ahd (http://sary-ahd.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name Marshmallow Script
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
buttons += emoticonButton("001", "http://img205.imageshack.us/img205/7715/emot1alarm.gif");
buttons += emoticonButton("002", "http://img805.imageshack.us/img805/4641/emot1angry.gif");
buttons += emoticonButton("003", "http://img198.imageshack.us/img198/1065/emot1crazy.gif");

buttons += emoticonButton("004", "http://img199.imageshack.us/img199/3861/emot1cry.gif");
buttons += emoticonButton("005", "http://img20.imageshack.us/img20/7738/emot1cute.gif");
buttons += emoticonButton("006", "http://img697.imageshack.us/img697/7540/emot1disappointed.gif");

buttons += emoticonButton("007", "http://img535.imageshack.us/img535/7636/emot1furios.gif");
buttons += emoticonButton("008", "http://img716.imageshack.us/img716/8228/emot1happy.gif");
buttons += emoticonButton("009", "http://img52.imageshack.us/img52/2203/emot1huh.gif");

buttons += emoticonButton("010", "http://img707.imageshack.us/img707/9238/emot1love.gif");
buttons += emoticonButton("011", "http://img805.imageshack.us/img805/42/emot1nerdy.gif");
buttons += emoticonButton("012", "http://img138.imageshack.us/img138/6482/emot1sad.gif");


buttons += emoticonButton("013", "http://img411.imageshack.us/img411/8433/emot1shocked.gif");
buttons += emoticonButton("014", "http://img208.imageshack.us/img208/852/emot1sick.gif");
buttons += emoticonButton("015", "http://img686.imageshack.us/img686/8245/emot1sleepy.gif");

buttons += emoticonButton("016", "http://img708.imageshack.us/img708/8462/emot1superhappy.gif");
buttons += emoticonButton("017", "http://img412.imageshack.us/img412/1236/emot1tongue.gif");
buttons += emoticonButton("018", "http://img96.imageshack.us/img96/5922/emot1whoo.gif");

buttons += emoticonButton("019", "http://img638.imageshack.us/img638/1119/emot1wink.gif");
buttons += separator();
editbar.innerHTML += buttons;
}
}

function emoticonButton(name, url) {
return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img class=\\\"emoticon\\\" src=\\\""+url+"\\\" width=\\\"21\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function separator() {
return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}
setemoticons("formatbar");
}, false);
