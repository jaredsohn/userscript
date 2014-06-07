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
	buttons += emoticonButton("biggrin", "http://img.photobucket.com/albums/v28/nainarulz/grin.gif");
	buttons += emoticonButton("confused", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_confused.gif");
	buttons += emoticonButton("cool", "http://img.photobucket.com/albums/v28/nainarulz/cool.gif");
	buttons += emoticonButton("cry", "http://img.photobucket.com/albums/v28/nainarulz/cry.gif");
	buttons += emoticonButton("eek", "http://img.photobucket.com/albums/v28/nainarulz/eek.gif");
	buttons += emoticonButton("evil", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_evil.gif");
	buttons += emoticonButton("exclaim", "http://wolverinex02.googlepages.com/icon_exclaim.gif");
	buttons += emoticonButton("idea", "http://wolverinex02.googlepages.com/icon_idea.gif");
	buttons += emoticonButton("lol", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_lol.gif");
	buttons += emoticonButton("mad", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_mad.gif");
	buttons += emoticonButton("mrgreen", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_mrgreen.gif");
	buttons += emoticonButton("neutral", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_neutral.gif");
	buttons += emoticonButton("question", "http://wolverinex02.googlepages.com/icon_question.gif");
	buttons += emoticonButton("razz", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_razz.gif");
	buttons += emoticonButton("rolleyes", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_rolleyes.gif");
	buttons += emoticonButton("redface", "http://img.photobucket.com/albums/v28/nainarulz/blush.gif");
	buttons += emoticonButton("sad", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_sad.gif");
	buttons += emoticonButton("smile", "http://img.photobucket.com/albums/v28/nainarulz/smile.gif");
	buttons += emoticonButton("surprised", "http://img.photobucket.com/albums/v28/nainarulz/surprised.gif");
	buttons += emoticonButton("twisted", "http://wolverinex02.googlepages.com/icon_twisted.gif");
	buttons += emoticonButton("wink", "http://img.photobucket.com/albums/v28/nainarulz/emoz/icon_wink.gif");
	buttons += emoticonButton("suspicious", "http://img.photobucket.com/albums/v28/nainarulz/suspicious.gif");
	buttons += emoticonButton("shrug", "http://img.photobucket.com/albums/v28/nainarulz/shrug.gif");
	buttons += emoticonButton("love", "http://img.photobucket.com/albums/v28/nainarulz/love.gif");
	buttons += emoticonButton("drool", "http://img.photobucket.com/albums/v28/nainarulz/drool.gif");
	buttons += emoticonButton("banghead", "http://img.photobucket.com/albums/v28/nainarulz/banghead.gif");
	buttons += emoticonButton("argh", "http://img.photobucket.com/albums/v28/nainarulz/argh.gif");
	buttons += emoticonButton("worship", "http://img.photobucket.com/albums/v28/nainarulz/notworthy.gif");
	buttons += emoticonButton("buttrock", "http://img.photobucket.com/albums/v28/nainarulz/buttrock.gif");
	buttons += emoticonButton("wise", "http://img.photobucket.com/albums/v28/nainarulz/wise.gif");
	buttons += emoticonButton("thumbsup", "http://img.photobucket.com/albums/v28/nainarulz/thumbsup.gif");
			
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