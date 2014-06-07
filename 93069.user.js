// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by the Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Rabbit smiley (Eun Sara Hyun)
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

	buttons += emoticonButton("erm", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit9-1.png");
	buttons += emoticonButton("hip", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit7.png");
	buttons += emoticonButton("scared", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit5.png");
	buttons += emoticonButton("happy", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit.png");
	buttons += emoticonButton("huh", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit8.png");
	buttons += emoticonButton("hehe", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit6.png");
	buttons += emoticonButton("shutup", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit4.png");
	buttons += emoticonButton("ow", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit3.png");
	buttons += emoticonButton("hmm", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/Saracons/missa%20saranggie/rabbit%20saranggie/sarabbit2.png");
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