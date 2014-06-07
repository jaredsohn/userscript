// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kao Chan Emoticons
// @namespace      Yllvyre
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
	buttons += emoticonButton("cry", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/cry.png");
	buttons += emoticonButton("crying", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/crying.png");
	buttons += emoticonButton("confused", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/curious.png");
	buttons += emoticonButton("dazed", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/dazed.png");
	buttons += emoticonButton("duh", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/duh.png");
	buttons += emoticonButton("evil", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/evil.png");
	buttons += emoticonButton("kiss", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kiss.png");
	buttons += emoticonButton("lol", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/lol.png");
	buttons += emoticonButton("love", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/love.png");
	buttons += emoticonButton("pain", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/pain.png");
	buttons += emoticonButton("point", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/point.png");
	buttons += emoticonButton("sad", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/sad.png");
	buttons += emoticonButton("shocked", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/schocked.png");
	buttons += emoticonButton("shock", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/shock.png");
	buttons += emoticonButton("smile", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smile.png");
	buttons += emoticonButton("star", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/star.png");
	buttons += emoticonButton("stressed", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/stressed.png");
	buttons += emoticonButton("suspicious", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/suspicious.png");
	buttons += emoticonButton("tounge", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/tounge.png");
			
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