// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://princess1089.blogspot.com)
//
// Modified by Aaron Boodman for better Google Chrome/Chromium support.

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name            Emoticons for Blogger
// @namespace      http://princess1089.blogspot.com
// @description    You can use emoticons in Blogger.
// @match          http://*.blogger.com/post-edit.g?*
// @match          http://*.blogger.com/post-create.g?*
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

function setemoticons(domname)
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("hk<3", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/1.gif");
	buttons += emoticonButton("sweat", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/2.gif");
	buttons += emoticonButton("?", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/3.gif");
	buttons += emoticonButton("!", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/4.gif");
	buttons += emoticonButton("um?", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/6.gif");
	buttons += emoticonButton("yay!", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/7.gif");
	buttons += emoticonButton("blush", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/8.gif");
	buttons += emoticonButton("Shh", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/9.gif");
	buttons += emoticonButton("teary", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/12.gif");
	buttons += emoticonButton("tear-drop", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/13.gif");
	buttons += emoticonButton(">.<", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/19.gif");
	buttons += emoticonButton(":)", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/20.gif");
	buttons += emoticonButton("zZz", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/21.gif");
	buttons += emoticonButton("^_^", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/22.gif");

	buttons += emoticonButton("-_<", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/_-.gif");
	buttons += emoticonButton("-_-'", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/-_--1.gif");
	buttons += emoticonButton("-_-", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/-_-.gif");
	buttons += emoticonButton("<3", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/3-1.gif");
	buttons += emoticonButton(";)", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/6ca147be.gif");
	buttons += emoticonButton(":3", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/3.gif");
	buttons += emoticonButton(":D", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/D.gif");
	buttons += emoticonButton(";]", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/53fc07c0.gif");
	buttons += emoticonButton(">o<", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/_.gif");
	buttons += emoticonButton("OX", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/OX.gif");
	buttons += emoticonButton("O_O", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/O_O.gif");
	buttons += emoticonButton("T_T", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/T_T.gif");
	buttons += emoticonButton("XD", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/XD.gif");
	buttons += emoticonButton("XP", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/XP.gif");
	buttons += emoticonButton(":]", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/c02f9e5e.gif");
	buttons += emoticonButton("kao_grin", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_big_grin.gif");
	buttons += emoticonButton("kao_blank", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_blank.gif");
	buttons += emoticonButton("kao_blush", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_blush.gif");
	buttons += emoticonButton("kao_confused", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_confused.gif");
	buttons += emoticonButton("kao_cool", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_cool.gif");
	buttons += emoticonButton("kao_evil", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_evil.gif");
	buttons += emoticonButton("kao_happy", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_happy.gif");
	buttons += emoticonButton("kao_love", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_love.gif");
	buttons += emoticonButton("kao_no", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_no.gif");
	buttons += emoticonButton("kao_sad", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/kao_sad.gif");
	buttons += emoticonButton("lol", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/lol.gif");
	buttons += emoticonButton("muaah", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/muaah.gif");
	buttons += emoticonButton("x_x", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/Emoticons/x_x.gif");

    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");
 }, false);