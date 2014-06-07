// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by the Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Cat Face smiley (Eun Sara Hyun)
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

	buttons += emoticonButton("happy", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thhappy-2.png");
	buttons += emoticonButton("sing", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thsinging.png");
	buttons += emoticonButton("serious", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thserious.png");
	buttons += emoticonButton("Proud", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thproud.png");
	buttons += emoticonButton("huh", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thoh.png");
	buttons += emoticonButton("love", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thlove-2.png");
	buttons += emoticonButton("laugh", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thlaughing.png");
	buttons += emoticonButton("sad", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thcry-2.png");
	buttons += emoticonButton("crafty", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thcrafty.png");
	buttons += emoticonButton("confused", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/thconfused-2.png");
	buttons += emoticonButton("beayeyed", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/beadyeyed.png");
	buttons += emoticonButton("angry", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/cat%20saranggie/angry-2.png");
	buttons += emoticonButton("thanks", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");


buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);