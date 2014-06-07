// Based on the original emoticonsforblogger by Eun Sara
// Modified by and Eun Dear Diary (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// Eun Cute Smiley
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Mr.Black Smileys
// @namespace      http://frankymuffins.blogspot.com/
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
	buttons += emoticonButton(":Shocked:", "http://i637.photobucket.com/albums/uu99/syamzone/shocked-32x32.png");
	buttons += emoticonButton(":horror:", "http://i637.photobucket.com/albums/uu99/syamzone/horror-32x32.png");
	buttons += emoticonButton(":victory:", "http://i637.photobucket.com/albums/uu99/syamzone/victory-32x32.png");
	buttons += emoticonButton(":anger:", "http://i637.photobucket.com/albums/uu99/syamzone/anger-32x32.png");
	buttons += emoticonButton(":cry:", "http://i637.photobucket.com/albums/uu99/syamzone/cry-32x32.png");
	buttons += emoticonButton(":eciting:", "http://i637.photobucket.com/albums/uu99/syamzone/exciting-32x32.png");
	        buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");
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