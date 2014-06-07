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
	buttons += emoticonButton("arrow", "http://wolverinex02.googlepages.com/icon_arrow.gif");
	buttons += emoticonButton("biggrin", "http://wolverinex02.googlepages.com/icon_biggrin.gif");
	buttons += emoticonButton("confused", "http://wolverinex02.googlepages.com/icon_confused.gif");
	buttons += emoticonButton("cool", "http://wolverinex02.googlepages.com/icon_cool.gif");
	buttons += emoticonButton("cry", "http://wolverinex02.googlepages.com/icon_cry.gif");
	buttons += emoticonButton("eek", "http://wolverinex02.googlepages.com/icon_eek.gif");
	buttons += emoticonButton("evil", "http://wolverinex02.googlepages.com/icon_evil.gif");
	buttons += emoticonButton("exclaim", "http://wolverinex02.googlepages.com/icon_exclaim.gif");
	buttons += emoticonButton("idea", "http://wolverinex02.googlepages.com/icon_idea.gif");
	buttons += emoticonButton("lol", "http://wolverinex02.googlepages.com/icon_lol.gif");
	buttons += emoticonButton("mad", "http://wolverinex02.googlepages.com/icon_mad.gif");
	buttons += emoticonButton("mrgreen", "http://wolverinex02.googlepages.com/icon_mrgreen.gif");
	buttons += emoticonButton("neutral", "http://wolverinex02.googlepages.com/icon_neutral.gif");
	buttons += emoticonButton("question", "http://wolverinex02.googlepages.com/icon_question.gif");
	buttons += emoticonButton("razz", "http://wolverinex02.googlepages.com/icon_razz.gif");
	buttons += emoticonButton("rolleyes", "http://wolverinex02.googlepages.com/icon_rolleyes.gif");
	buttons += emoticonButton("redface", "http://wolverinex02.googlepages.com/icon_redface.gif");
	buttons += emoticonButton("sad", "http://wolverinex02.googlepages.com/icon_sad.gif");
	buttons += emoticonButton("smile", "http://wolverinex02.googlepages.com/icon_smile.gif");
	buttons += emoticonButton("surprised", "http://wolverinex02.googlepages.com/icon_surprised.gif");
	buttons += emoticonButton("twisted", "http://wolverinex02.googlepages.com/icon_twisted.gif");
	buttons += emoticonButton("wink", "http://wolverinex02.googlepages.com/icon_wink.gif");
			
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