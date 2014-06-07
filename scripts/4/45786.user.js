// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("wink", "http://i392.photobucket.com/albums/pp6/imaleya/kao_wink.gif");

	buttons += emoticonButton("kiss", "http://i392.photobucket.com/albums/pp6/imaleya/kao_kiss.gif");

	buttons += emoticonButton("sad", "http://i392.photobucket.com/albums/pp6/imaleya/kao_sad.gif");

	buttons += emoticonButton("grin", "http://i392.photobucket.com/albums/pp6/imaleya/kao_big_grin.gif");

	buttons += emoticonButton("smile", "http://i392.photobucket.com/albums/pp6/imaleya/kao_smile.gif");

	buttons += emoticonButton("cool", "http://i392.photobucket.com/albums/pp6/imaleya/kao_cool.gif");

	buttons += emoticonButton("posh", "http://i392.photobucket.com/albums/pp6/imaleya/kao_posh.gif");

	buttons += emoticonButton("confused", "http://i392.photobucket.com/albums/pp6/imaleya/kao_confused.gif");

	buttons += emoticonButton("sweat", "http://i392.photobucket.com/albums/pp6/imaleya/kao_sweat.gif");

	buttons += emoticonButton("shocked", "http://i392.photobucket.com/albums/pp6/imaleya/kao_shocked.gif");

	buttons += emoticonButton("blush", "http://i392.photobucket.com/albums/pp6/imaleya/kao_blush.gif");

	buttons += emoticonButton("cheering", "http://i392.photobucket.com/albums/pp6/imaleya/kao_cheering.gif");

	buttons += emoticonButton("blank", "http://i392.photobucket.com/albums/pp6/imaleya/kao_blank.gif");

	buttons += emoticonButton("mad", "http://i392.photobucket.com/albums/pp6/imaleya/kao_mad.gif");

	buttons += emoticonButton("cry", "http://i392.photobucket.com/albums/pp6/imaleya/kao_cry.gif");

	buttons += emoticonButton("sick", "http://i392.photobucket.com/albums/pp6/imaleya/kao_sick.gif");

	buttons += emoticonButton("heart", "http://i392.photobucket.com/albums/pp6/imaleya/heart_bounce.gif");

	buttons += emoticonButton("evil", "http://i392.photobucket.com/albums/pp6/imaleya/kao_evil.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);