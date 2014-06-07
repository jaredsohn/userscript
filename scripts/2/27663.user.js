// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Day (http://sary-day.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           LittleGirl Script
// @namespace      http://asyahday.blogspot.com
// @description    Blogger
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("001", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-001.gif");
	buttons += emoticonButton("002", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-002.gif");
	buttons += emoticonButton("003", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-003.gif");
        buttons += emoticonButton("004", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-004.gif");
        buttons += emoticonButton("005", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-005.gif");
        buttons += emoticonButton("006", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-006.gif");
        buttons += emoticonButton("007", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-007.gif");
        buttons += emoticonButton("008", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-008.gif");
        buttons += emoticonButton("009", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-009.gif");
        buttons += emoticonButton("010", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-010.gif");
        buttons += emoticonButton("011", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-011.gif");
        buttons += emoticonButton("012", "http://i296.photobucket.com/albums/mm195/asyahday/Smiley/emo-girl-012.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"30\\\" height=\\\"30\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
