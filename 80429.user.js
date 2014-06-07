// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://rastiablog.blogspot.com/
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
	buttons += emoticonButton("arrow", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue45.gif");
	buttons += emoticonButton("biggrin", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue52.gif");
	buttons += emoticonButton("confused", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue22.gif");
	buttons += emoticonButton("cool", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue46.gif");
	buttons += emoticonButton("cry", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue33.gif");
	buttons += emoticonButton("eek", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blue22.gif");
	buttons += emoticonButton("evil", "http://www.anikaos.com/0033-halloween_images/halloween_pictures/halloween_skull-01.gif");
	buttons += emoticonButton("exclaim", "http://www.anikaos.com/0033-halloween_images/halloween_pictures02.gif");
	buttons += emoticonButton("idea", "http://www.anikaos.com/0005-pinky/kaos-pinky04.gif");
	buttons += emoticonButton("lol", "http://www.anikaos.com/0003-panda/kaos-panda12.gif");
	buttons += emoticonButton("mad", "http://www.anikaos.com/0003-panda/kaos-panda05.gif");
	buttons += emoticonButton("mrgreen", "http://www.anikaos.com/0003-panda/kaos-panda01.gif");
	buttons += emoticonButton("neutral", "http://wolverinex02.googlepages.com/icon_neutral.gif");
	buttons += emoticonButton("question", "http://www.anikaos.com/0003-panda/kaos-panda08.gif");
	buttons += emoticonButton("razz", "http://www.msnpro.com/japanese/abfx.gif");
	buttons += emoticonButton("rolleyes", "http://www.msnpro.com/japanese/rabb.gif");
	buttons += emoticonButton("redface", "http://www.msnpro.com/japanese/trose.gif");
	buttons += emoticonButton("sad", "http://www.msnpro.com/japanese/wink.gif");
	buttons += emoticonButton("smile", "http://www.anikaos.com/0033-halloween_images/halloween_pictures05.gif");
	buttons += emoticonButton("surprised", "http://www.anikaos.com/0018-chikas_kaoani/chikas_blueangel05.gif");
	buttons += emoticonButton("twisted", "http://www.anikaos.com/0012-crazybunny/kaos-crazybunny12.gif");
	buttons += emoticonButton("wink", "http://www.anikaos.com/0012-crazybunny/kaos-crazybunny09.gif");
			
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