// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by MEii (http://babyyxl0ve.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://babyyxl0ve.blogspot.com/
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

	buttons += emoticonButton("<3", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/1.gif");
	buttons += emoticonButton("sweat", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/2.gif");
	buttons += emoticonButton("?", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/3.gif");
	buttons += emoticonButton("!", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/4.gif");
	buttons += emoticonButton("zZz", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/5.gif");
	buttons += emoticonButton("um?", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/6.gif");
	buttons += emoticonButton("yay!", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/7.gif");
	buttons += emoticonButton("blush", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/8.gif");
	buttons += emoticonButton("Shh...", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/9.gif");
	buttons += emoticonButton("tear", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/11.gif");
	buttons += emoticonButton("teary eye", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/12.gif");
	buttons += emoticonButton("cry", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/13.gif");
	buttons += emoticonButton("mad", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/19.gif");
	buttons += emoticonButton(":]", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/20.gif");
	buttons += emoticonButton("sleep", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/21.gif");
	buttons += emoticonButton("^_^", "http://i404.photobucket.com/albums/pp130/PiiNkL0ve/HK%20Emoticons/22.gif");

	
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);