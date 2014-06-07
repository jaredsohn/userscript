// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by tinkerbell (http://tinkerbell-cafe.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Tomato Girl for Blogger
// @namespace      http://tinkerbell-cafe.blogspot.com/
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
	buttons += emoticonButton(";n;", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/tomatogirl/tg1.gif");
	buttons += emoticonButton("=u=", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/tomatogirl/tg2.gif");
	buttons += emoticonButton("*Q*", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/tomatogirl/tg3.gif");
	buttons += emoticonButton(":I", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/tomatogirl/tg4.gif");
	buttons += emoticonButton("Piss", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/tomatogirl/tg5.gif");

				
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);