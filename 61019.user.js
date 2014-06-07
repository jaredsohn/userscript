// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Smilies 1
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
	buttons += emoticonButton("blinking", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/blinking.gif");
	buttons += emoticonButton("chu", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/chu.gif");
	buttons += emoticonButton("dead", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/dead.gif");
	buttons += emoticonButton("grin", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/grin.gif");
	buttons += emoticonButton("happy", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/happy.gif");
	buttons += emoticonButton("heart", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/heart.gif");
	buttons += emoticonButton("kawaii", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/kawaii.gif");
	buttons += emoticonButton("mad", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/mad.gif");
	buttons += emoticonButton("love", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/love.gif");
	buttons += emoticonButton("nervous", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/nervous.gif");
	buttons += emoticonButton("rainbow", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/rainbow.gif");
	buttons += emoticonButton("really", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/really.gif");
	buttons += emoticonButton("sad", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/sad.gif");
	buttons += emoticonButton("smile", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/smile.gif");
	buttons += emoticonButton("tired", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/smilies1/tired.gif");
			
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