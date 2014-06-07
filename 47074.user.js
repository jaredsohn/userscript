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
	buttons += emoticonButton("wink", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_wink.gif");
	buttons += emoticonButton("yes", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_yes.gif");
	buttons += emoticonButton("tounge", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_tongue.gif");
	buttons += emoticonButton("sweat", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_sweat.gif");
	buttons += emoticonButton("smile", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_smile.gif");
	buttons += emoticonButton("sick", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_sick.gif");
	buttons += emoticonButton("shocked", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_shocked.gif");
	buttons += emoticonButton("sad", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_sad.gif");
	buttons += emoticonButton("regular", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_regular.gif");
	buttons += emoticonButton("posh", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_posh.gif");
	buttons += emoticonButton("no", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_no.gif");
	buttons += emoticonButton("mouthshut", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_mouth_shut.gif");
	buttons += emoticonButton("mad", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_mad.gif");
	buttons += emoticonButton("love", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_love.gif");
	buttons += emoticonButton("lol", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_lol.gif");
	buttons += emoticonButton("laugh", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_laughing.gif");
	buttons += emoticonButton("kiss", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_kiss.gif");
	buttons += emoticonButton("happy", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_happy.gif");
	buttons += emoticonButton("evil", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_evil.gif");
	buttons += emoticonButton("cute", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_cute.gif");
	buttons += emoticonButton("cry", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_cry.gif");
	buttons += emoticonButton("cool", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_cool.gif");
	buttons += emoticonButton("confused", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_confused.gif");
	buttons += emoticonButton("cheering", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_cheering.gif");
	buttons += emoticonButton("blush", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_blush.gif");
	buttons += emoticonButton("blank", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_blank.gif");
	buttons += emoticonButton("biggrin", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_big_grin.gif");
	buttons += emoticonButton("heartbounce", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/heart_bounce.gif");
			
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